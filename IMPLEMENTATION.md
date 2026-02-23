# Plant Disease Detection System - Complete Implementation Guide

## 1. Project Overview

This project is a full-stack Machine Learning web application that identifies plant diseases from leaf images using a Convolutional Neural Network (CNN). The system achieves **97% accuracy** and provides an intuitive, animated user interface.

### Key Features
- 🧠 **AI-Powered Detection:** Deep learning CNN model for accurate disease identification
- 🎨 **Modern UI:** Plant-themed design with smooth animations
- 📱 **Responsive:** Works on desktop and mobile devices
- ⚡ **Fast:** Real-time predictions with visual feedback
- 🌿 **Comprehensive:** Covers 38 disease classes across 14 plant species

---

## 2. Project Architecture

### 2.1. Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Frontend | React 19 + Vite | User interface |
| Backend | FastAPI + Uvicorn | REST API server |
| ML Engine | TensorFlow/Keras | Model inference |
| Styling | CSS3 with Animations | Visual design |

### 2.2. File Structure
```
d:\ML
├── backend/                              # Python FastAPI Backend
│   ├── main.py                          # API endpoints & model inference
│   └── test_api.py                      # API testing scripts
├── frontend/                             # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ImageUpload.jsx          # Drag & drop image upload
│   │   │   ├── PredictionResult.jsx     # Disease result display
│   │   │   └── About.jsx                # About page with architecture
│   │   ├── App.jsx                      # Main application component
│   │   ├── App.css                      # Component-specific styles
│   │   ├── index.css                    # Global styles & animations
│   │   └── main.jsx                     # React entry point
│   ├── public/                          # Static assets
│   ├── package.json                     # Frontend dependencies
│   ├── vite.config.js                   # Vite configuration
│   └── index.html                       # HTML template
├── New Plant Diseases Dataset(Augmented)/ # Training Dataset
│   ├── train/                           # ~70,000 training images
│   └── valid/                           # Validation images
├── best_model.keras                      # Primary trained model
├── my_cnn_model.h5                       # Legacy model (fallback)
├── plant-diseases-detection-cnn-97-acc.ipynb  # Training notebook
└── IMPLEMENTATION.md                     # This documentation
```

---

## 3. Design System

### 3.1. Color Palette

The application uses a **natural plant-themed** color scheme:

| Color | Hex Code | CSS Variable | Usage |
|-------|----------|--------------|-------|
| Leaf Green | `#4CAF50` | `--primary-color` | Primary actions, headers |
| Green Hover | `#45a049` | `--primary-hover` | Button hover states |
| Aqua Blue | `#4DD0E1` | `--secondary-color` | Accent elements |
| Earthy Brown | `#8D6E63` | `--earthy-brown` | Footer background |
| Light Cream | `#F9F9F9` | `--bg-cream` | Page background |
| Mint Card | `#E8F5E9` | `--card-bg` | Card backgrounds |
| Dark Text | `#333333` | `--text-dark` | Body text |
| White | `#FFFFFF` | `--text-white` | Light text on dark |

### 3.2. Typography
- **Font Family:** Inter, system-ui, Avenir, Helvetica, Arial
- **Headings:** Bold (700-800 weight)
- **Body:** Regular (400-500 weight)

---

## 4. Animation System

The UI features extensive smooth animations using CSS keyframes:

### 4.1. Entry Animations
| Animation | Duration | Effect |
|-----------|----------|--------|
| `fadeIn` | 0.5-0.8s | Fade in with upward movement |
| `slideUp` | 0.6-0.7s | Slide up from below |
| `slideInLeft` | 0.5s | Slide in from left (logo) |
| `bounceIn` | 0.6s | Elastic bounce entry |
| `zoomIn` | 0.5s | Scale from small to full |
| `countUp` | 0.8s | Stats number reveal |

### 4.2. Interactive Animations
| Animation | Trigger | Effect |
|-----------|---------|--------|
| `float` | Continuous | Floating upload icon |
| `pulse` | Continuous | Gentle breathing effect |
| `bounce` | Hover | Icon bounce on feature cards |
| `glow` | Continuous | Soft glow effect |
| `healthyPulse` | Result | Green pulse for healthy plants |
| `diseasePulse` | Result | Red pulse for diseased plants |

### 4.3. Loading Animations
| Animation | Duration | Effect |
|-----------|----------|--------|
| `spin` | 0.8s | Spinner rotation |
| `scanLine` | 1.5s | Horizontal scan sweep |
| `scanVertical` | 2s | Vertical scan line |
| `pulseGlow` | 1s | Pulsing border glow |
| `shimmer` | - | Shimmer effect |

### 4.4. Hover Effects
- **Cards:** `translateY(-8px) scale(1.02)` with enhanced shadow
- **Buttons:** `translateY(-3px) scale(1.02)` with glow
- **Feature Icons:** Scale + rotation
- **Stats:** `scale(1.1)` with text glow
- **Navigation:** Underline slide animation

---

## 5. Component Implementation

### 5.1. App.jsx (Main Component)

**State Management:**
```javascript
const [activeTab, setActiveTab] = useState('home');     // Navigation
const [selectedFile, setSelectedFile] = useState(null); // Uploaded file
const [prediction, setPrediction] = useState(null);     // API result
const [loading, setLoading] = useState(false);          // Loading state
const [error, setError] = useState(null);               // Error handling
```

**Page Sections:**
1. **Header:** Logo + Navigation (Home/About)
2. **Hero Section:** Title, badge, subtitle
3. **Features Section:** 3 feature cards with icons
4. **Upload Section:** Glass card with drag-drop upload
5. **Stats Section:** 4 statistics (97% accuracy, 38 classes, etc.)
6. **Footer:** Copyright + powered by text

### 5.2. ImageUpload.jsx

**Features:**
- Drag & drop file handling
- Click to upload alternative
- Image preview display
- File type validation
- Floating leaf icon animation

**Events:**
- `onDragEnter/onDragOver/onDragLeave` - Visual feedback
- `onDrop` - File capture from drag
- `onChange` - File capture from input
- `onClick` - Trigger hidden file input

### 5.3. PredictionResult.jsx

**Display Elements:**
- Mock mode warning (if TensorFlow not installed)
- Plant name (formatted)
- Disease/health status with colored badge
- Confidence percentage
- Health indicator message

**Dynamic Styling:**
- Green pulse animation for healthy plants
- Red pulse animation for diseased plants

### 5.4. About.jsx

**Content:**
- Architecture diagram (User → Frontend → Backend → Model)
- Workflow explanation (4 steps)
- Technology tags

---

## 6. Backend Implementation

### 6.1. API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Upload image, get disease prediction |
| `/` | GET | Serve React frontend (production) |
| `/{path}` | GET | SPA routing fallback |

### 6.2. Image Preprocessing Pipeline

```python
def read_file_as_image(data) -> np.ndarray:
    image = Image.open(io.BytesIO(data))
    image = image.convert('RGB')      # Handle RGBA, grayscale
    image = image.resize((150, 150))  # Match model input
    image = np.array(image)
    return image
```

**Normalization:** `img_batch / 255.0` (scale to 0-1 range)

### 6.3. Model Loading Strategy

```python
try:
    # Primary: .keras format
    model = tf.keras.models.load_model("best_model.keras")
except:
    try:
        # Fallback: .h5 format
        model = tf.keras.models.load_model("my_cnn_model.h5")
    except:
        # Mock mode for testing without TensorFlow
        model = MockModel()
```

### 6.4. Response Format

```json
{
    "class": "Tomato___Early_blight",
    "plant": "Tomato",
    "disease": "Early blight",
    "confidence": 0.9823,
    "mock": false
}
```

### 6.5. CORS Configuration

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 7. Machine Learning Model

### 7.1. Model Specifications

| Property | Value |
|----------|-------|
| Type | Convolutional Neural Network (CNN) |
| Input Shape | (150, 150, 3) - RGB images |
| Output | 38 classes (softmax) |
| Training Images | ~70,000+ |
| Validation Accuracy | ~97% |
| File Format | `.keras` (primary), `.h5` (legacy) |

### 7.2. Supported Classes (38 Total)

**Plants Covered (14):**
Apple, Blueberry, Cherry, Corn, Grape, Orange, Peach, Pepper, Potato, Raspberry, Soybean, Squash, Strawberry, Tomato

**Disease Examples:**
- Apple: Scab, Black rot, Cedar rust
- Tomato: Bacterial spot, Early blight, Late blight, Leaf mold, Mosaic virus
- Potato: Early blight, Late blight
- Grape: Black rot, Esca (Black Measles)
- Corn: Cercospora leaf spot, Common rust, Northern leaf blight

### 7.3. Class Index Mapping

```python
CLASS_NAMES = {
    0: "Apple___Apple_scab",
    1: "Apple___Black_rot",
    2: "Apple___Cedar_apple_rust",
    3: "Apple___healthy",
    # ... (38 classes total)
    37: "Tomato___healthy"
}
```

---

## 8. Dataset Details

The project is trained on the **New Plant Diseases Dataset (Augmented)**.

| Property | Details |
|----------|---------|
| Content | Images of crop leaves (healthy + diseased) |
| Structure | `train/` and `valid/` directories |
| Classes | 38 distinct classes |
| Plants | 14 species |
| Augmentation | Rotation, flip, zoom for robustness |

---

## 9. System Workflow

### 9.1. Data Flow Diagram

```
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  User   │───▶│ React   │───▶│ FastAPI │───▶│  CNN    │
│ Upload  │    │Frontend │    │ Backend │    │ Model   │
└─────────┘    └─────────┘    └─────────┘    └─────────┘
                                                  │
┌─────────┐    ┌─────────┐    ┌─────────┐        │
│ Display │◀───│ Parse   │◀───│  JSON   │◀───────┘
│ Result  │    │Response │    │Response │
└─────────┘    └─────────┘    └─────────┘
```

### 9.2. Step-by-Step Process

1. **User Action:** Upload leaf image via drag-drop or click
2. **Frontend Request:** FormData POST to `/predict`
3. **Backend Processing:**
   - Read image bytes with PIL
   - Convert to RGB (handle RGBA/grayscale)
   - Resize to 150×150
   - Normalize to 0-1 range
4. **Model Inference:** `model.predict()` returns 38-class probabilities
5. **Post-Processing:** Extract highest probability class
6. **Response:** JSON with plant, disease, confidence
7. **Display:** Animated result card with health status

---

## 10. Setup & Installation

### 10.1. Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| Python | **3.10 - 3.12** (NOT 3.13+) |
| npm | 9+ |

> ⚠️ **Important:** TensorFlow does not support Python 3.13+. Use Python 3.12 or earlier.

### 10.2. Backend Setup

```powershell
# 1. Create virtual environment with Python 3.12
py -3.12 -m venv .venv

# 2. Activate virtual environment
.venv\Scripts\activate

# 3. Install dependencies
pip install tensorflow fastapi uvicorn pillow python-multipart

# 4. Run the server
cd backend
python main.py
```

Server runs at: `http://localhost:8000`

### 10.3. Frontend Setup

```powershell
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev
```

Development server runs at: `http://localhost:5173`

### 10.4. Production Deployment

```powershell
# 1. Build frontend
cd frontend
npm run build

# 2. Run backend (serves both API and frontend)
cd ../backend
python main.py
```

Production runs at: `http://localhost:8000`

---

## 11. API Reference

### 11.1. Predict Endpoint

**Request:**
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@leaf_image.jpg"
```

**Response:**
```json
{
    "class": "Tomato___Late_blight",
    "plant": "Tomato",
    "disease": "Late blight",
    "confidence": 0.9567,
    "mock": false
}
```

### 11.2. Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `class` | string | Full class name (Plant___Disease) |
| `plant` | string | Plant species name |
| `disease` | string | Disease name (or "healthy") |
| `confidence` | float | Prediction confidence (0-1) |
| `mock` | boolean | True if using mock model |

---

## 12. UI/UX Layout

### 12.1. Home Page Structure

```
┌─────────────────────────────────────────┐
│  🌿 Plant Doctor          [Home] [About]│  ← Header
├─────────────────────────────────────────┤
│                                         │
│    🌱 AI-Powered Plant Care (badge)     │
│    Detect Plant Diseases Instantly      │  ← Hero
│    Upload a photo of your plant...      │
│                                         │
├─────────────────────────────────────────┤
│  ┌───────┐  ┌───────┐  ┌───────┐       │
│  │ 📸    │  │ 🧠    │  │ 🌿    │       │  ← Features
│  │Upload │  │AI Anal│  │38 Dis │       │
│  └───────┘  └───────┘  └───────┘       │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐   │
│  │     🔬 Start Analysis           │   │
│  │                                 │   │  ← Upload Card
│  │     🍃 Drag & Drop here         │   │
│  │                                 │   │
│  │     [Analyze Leaf 🔍]           │   │
│  └─────────────────────────────────┘   │
├─────────────────────────────────────────┤
│   97%    │   38    │   14    │   70K+  │  ← Stats
│ Accuracy │ Classes │ Species │ Images  │
├─────────────────────────────────────────┤
│  © 2026 Plant Doctor AI                 │  ← Footer
│  Powered by TensorFlow & FastAPI        │
└─────────────────────────────────────────┘
```

### 12.2. User Flow

```
[Start] → [Upload Image] → [Click Analyze] → [Loading Animation]
                                                     ↓
[View Result] ← [Display Prediction] ← [API Response]
      ↓
[Test Another] → [Reset State] → [Upload Image]
```

---

## 13. Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "TensorFlow not installed" | Python 3.13+ | Use Python 3.10-3.12 |
| Port 8000 in use | Another process | Kill process or use different port |
| CORS error | Dev server mismatch | Check API URL in App.jsx |
| Model not found | Wrong path | Ensure model files in root directory |
| Blank predictions | RGBA images | Fixed: `image.convert('RGB')` |

### Debug Commands

```powershell
# Check Python version
python --version

# Check TensorFlow installation
python -c "import tensorflow as tf; print(tf.__version__)"

# Check model input shape
python -c "import tensorflow as tf; m = tf.keras.models.load_model('best_model.keras'); print(m.input_shape)"

# Kill process on port 8000
Get-NetTCPConnection -LocalPort 8000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

---

## 14. Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Chrome | ✅ Full |
| Mobile Safari | ✅ Full |

---

## 15. Future Enhancements

- [ ] Add more plant species
- [ ] Implement treatment recommendations
- [ ] Add image capture from camera
- [ ] Support batch image processing
- [ ] Add disease severity scoring
- [ ] Implement user history/favorites
- [ ] Add offline PWA support

---

## 16. Credits

- **Dataset:** New Plant Diseases Dataset (Augmented)
- **Framework:** TensorFlow/Keras
- **Icons:** Emoji-based iconography
- **Design:** Custom plant-themed UI

---

*Last Updated: February 2026*
