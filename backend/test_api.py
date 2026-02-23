import requests
from PIL import Image
import io
import numpy as np

def create_dummy_image():
    # Create a random image (150x150 RGB)
    img_array = np.random.randint(0, 255, (150, 150, 3), dtype=np.uint8)
    image = Image.fromarray(img_array)
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='JPEG')
    return img_byte_arr.getvalue()

def test_prediction():
    url = "http://localhost:8000/predict"
    image_data = create_dummy_image()
    
    files = {'file': ('test.jpg', image_data, 'image/jpeg')}
    
    try:
        response = requests.post(url, files=files)
        
        if response.status_code == 200:
            print("Success! API Response:")
            print(response.json())
            
            data = response.json()
            if 'class' in data and 'confidence' in data:
                 print("✅ Verification Passed: Correct Output Structure")
            else:
                 print("❌ Verification Failed: Invalid Output Structure")
                 
        else:
            print(f"❌ Error: API returned {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to backend. Is it running?")

if __name__ == "__main__":
    test_prediction()
