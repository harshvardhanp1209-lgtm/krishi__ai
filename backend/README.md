# Krishi AI — Backend

AI-powered agriculture advisory API built with FastAPI and scikit-learn.
Predicts the best crop for given soil and climate conditions, and provides
comprehensive farming guidance.

---

## Features

| Feature | Endpoint |
|---|---|
| Crop prediction (RandomForest ML) | `POST /predict-crop` |
| Soil health analysis | included in `/predict-crop` |
| Fertilizer recommendation | included in `/predict-crop` |
| Weather alert | included in `/predict-crop` |
| Disease risk assessment | included in `/predict-crop` |
| Profitability estimate | included in `/predict-crop` |
| Crop calendar | included in `/predict-crop` |
| Agriculture advisory chat | `POST /chat` |

---

## Project Structure

```
backend/
├── main.py                    # FastAPI application entry point
├── requirements.txt           # Python dependencies
├── .env.example               # Environment variable template
│
├── model/
│   ├── train_model.py         # ML training script
│   ├── crop_model.pkl         # Trained RandomForest model (generated)
│   └── label_encoder.pkl      # Label encoder (generated)
│
├── utils/
│   ├── fertilizer.py          # Fertilizer recommendation logic
│   ├── soil_health.py         # Soil pH and nutrient analysis
│   ├── weather_alert.py       # Rainfall and temperature alerts
│   ├── disease_risk.py        # Disease risk assessment
│   ├── profitability.py       # Crop profitability mapping
│   └── crop_calendar.py       # Sowing/harvesting calendar
│
└── dataset/
    ├── Crop_recommendation.csv  # Training dataset (generated)
    └── generate_dataset.py      # Synthetic dataset generator
```

---

## Quick Start

### 1. Create and activate a virtual environment

```bash
python -m venv venv
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate
```

### 2. Install dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
# Edit .env as needed
```

### 4. Train the ML model

This generates the dataset (if missing) and trains the RandomForestClassifier.

```bash
python model/train_model.py
```

Expected output:
```
[INFO] Training RandomForestClassifier...
[INFO] Test Accuracy: 99.xx%
[INFO] Model saved    → backend/model/crop_model.pkl
[INFO] Encoder saved  → backend/model/label_encoder.pkl
[SUCCESS] Training pipeline finished.
```

### 5. Start the API server

```bash
uvicorn main:app --reload
```

The server runs at **http://127.0.0.1:8000**

---

## API Documentation

Interactive Swagger UI: http://127.0.0.1:8000/docs  
ReDoc: http://127.0.0.1:8000/redoc

---

## API Reference

### `POST /predict-crop`

**Request body:**
```json
{
  "N": 90,
  "P": 42,
  "K": 43,
  "temperature": 20.8,
  "humidity": 82.0,
  "ph": 6.5,
  "rainfall": 202.9,
  "location": "Punjab",
  "language": "en"
}
```

**Response:**
```json
{
  "recommended_crop": "rice",
  "confidence_score": 0.97,
  "reason": "Based on your soil (N=90, P=42, K=43, pH=6.5) ...",
  "soil_health": "Optimal pH (6.5) — well balanced for most crops",
  "fertilizer_recommendation": "Soil nutrients are within adequate ranges...",
  "weather_alert": "Weather conditions are favorable for farming...",
  "disease_risk": "RISK LEVEL: HIGH — High fungal disease risk...",
  "profitability": "Profitability: Medium | Average Yield: 4-6 tonnes/ha | ...",
  "crop_calendar": {
    "sowing_time": "June - July (Kharif season)",
    "harvesting_time": "October - November",
    "water_requirement": "High — 1000-2000 mm per season..."
  }
}
```

---

### `POST /chat`

**Request body:**
```json
{
  "message": "How do I fix low nitrogen in my soil?",
  "language": "en"
}
```

**Response:**
```json
{
  "reply": "Fertilizer use depends on your soil's NPK levels. Low Nitrogen → apply Urea..."
}
```

Supported chat keywords: `fertilizer`, `irrigation`, `pest`, `disease`, `soil`, `weather`, `crop`, `organic`, `subsidy`, `msp`

---

## Dataset

The dataset (`Crop_recommendation.csv`) contains 2,400 rows for 24 crops with these features:

| Column | Description |
|---|---|
| N | Soil Nitrogen (mg/kg) |
| P | Soil Phosphorus (mg/kg) |
| K | Soil Potassium (mg/kg) |
| temperature | Average temperature (°C) |
| humidity | Relative humidity (%) |
| ph | Soil pH (0-14) |
| rainfall | Annual rainfall (mm) |
| label | Crop name (target variable) |

**Supported crops:**
apple, banana, blackgram, chickpea, coconut, coffee, cotton, grapes, jute, kidneybeans,
lentil, maize, mango, mothbeans, mungbean, muskmelon, orange, papaya, pigeonpeas,
pomegranate, rice, sugarcane, watermelon, wheat

---

## Tech Stack

- **Python 3.10+**
- **FastAPI** — modern async web framework
- **scikit-learn** — RandomForestClassifier for crop prediction
- **Pandas / NumPy** — data processing
- **Joblib** — model serialization
- **Uvicorn** — ASGI server
- **Pydantic v2** — data validation
