import uvicorn
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve React Frontend
from fastapi.staticfiles import StaticFiles
import os

# Define path to frontend build
FRONTEND_DIR = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

if os.path.exists(FRONTEND_DIR):
    # Mount static files (JS, CSS, images)
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")
    
    # Catch-all route to serve index.html for client-side routing
    from fastapi.responses import FileResponse
    @app.get("/", include_in_schema=False)
    @app.get("/{path:path}", include_in_schema=False)
    async def serve_react_app(path: str = ""):
        # Check if the requested file exists in the frontend directory (e.g., favicon.ico)
        file_path = os.path.join(FRONTEND_DIR, path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        # Otherwise serve index.html
        return FileResponse(os.path.join(FRONTEND_DIR, "index.html"))
else:
    print("Frontend build directory not found. Please run 'npm run build' in frontend directory.")
    @app.get("/")
    async def root():
        return {"message": "Frontend not found. Please build the frontend first."}

# Load the model
try:
    import tensorflow as tf
    
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    
    # Attempt to load the .keras model first, fallback to .h5 if needed
    MODEL_PATH = os.path.join(BASE_DIR, "..", "best_model.keras")
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print(f"Model loaded successfully from {MODEL_PATH}")
    except Exception as e:
        print(f"Error loading best_model.keras: {e}")
        try:
            MODEL_PATH = os.path.join(BASE_DIR, "..", "my_cnn_model.h5")
            model = tf.keras.models.load_model(MODEL_PATH)
            print(f"Model loaded successfully from {MODEL_PATH}")
        except Exception as h5_e:
            print(f"Error loading my_cnn_model.h5: {h5_e}")
            model = None
except ImportError:
    print("TensorFlow not installed. Using Mock Model.")
    model = None

# Mock Model for fallback
class MockModel:
    def predict(self, img_batch):
        mock_preds = np.zeros((1, 38))
        random_class = np.random.randint(0, 38)
        mock_preds[0][random_class] = np.random.uniform(0.85, 0.99)
        return mock_preds

USING_MOCK_MODEL = model is None
if model is None:
    print("WARNING: Using MockModel - predictions are RANDOM (TensorFlow not installed)")
    model = MockModel()


# Class Names Dictionary
CLASS_NAMES = {
    0: "Apple___Apple_scab",
    1: "Apple___Black_rot",
    2: "Apple___Cedar_apple_rust",
    3: "Apple___healthy",
    4: "Blueberry___healthy",
    5: "Cherry_(including_sour)___Powdery_mildew",
    6: "Cherry_(including_sour)___healthy",
    7: "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    8: "Corn_(maize)___Common_rust_",
    9: "Corn_(maize)___Northern_Leaf_Blight",
    10: "Corn_(maize)___healthy",
    11: "Grape___Black_rot",
    12: "Grape___Esca_(Black_Measles)",
    13: "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    14: "Grape___healthy",
    15: "Orange___Haunglongbing_(Citrus_greening)",
    16: "Peach___Bacterial_spot",
    17: "Peach___healthy",
    18: "Pepper,_bell___Bacterial_spot",
    19: "Pepper,_bell___healthy",
    20: "Potato___Early_blight",
    21: "Potato___Late_blight",
    22: "Potato___healthy",
    23: "Raspberry___healthy",
    24: "Soybean___healthy",
    25: "Squash___Powdery_mildew",
    26: "Strawberry___Leaf_scorch",
    27: "Strawberry___healthy",
    28: "Tomato___Bacterial_spot",
    29: "Tomato___Early_blight",
    30: "Tomato___Late_blight",
    31: "Tomato___Leaf_Mold",
    32: "Tomato___Septoria_leaf_spot",
    33: "Tomato___Spider_mites Two-spotted_spider_mite",
    34: "Tomato___Target_Spot",
    35: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    36: "Tomato___Tomato_mosaic_virus",
    37: "Tomato___healthy"
}

def read_file_as_image(data) -> np.ndarray:
    image = Image.open(io.BytesIO(data))
    image = image.convert('RGB')  # Ensure 3 channels (handles RGBA, grayscale, etc.)
    image = image.resize((150, 150))
    image = np.array(image)
    return image


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        return {"error": "Model not loaded"}
    
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    # Normalize if the model expects it (based on notebook rescale=1./255)
    img_batch = img_batch.astype('float32') / 255.0
    
    predictions = model.predict(img_batch)
    
    predicted_class_index = np.argmax(predictions[0])
    predicted_class = CLASS_NAMES.get(predicted_class_index, "Unknown___Unknown")
    confidence = float(np.max(predictions[0]))
    
    # Parse class name (format: Plant___Disease)
    if "___" in predicted_class:
        plant, disease = predicted_class.split("___")
        disease = disease.replace("_", " ")
    else:
        plant = predicted_class
        disease = "Unknown"

    return {
        'class': predicted_class,
        'plant': plant,
        'disease': disease,
        'confidence': confidence,
        'mock': USING_MOCK_MODEL
    }

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
