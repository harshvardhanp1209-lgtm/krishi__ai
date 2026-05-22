"""
Krishi AI — FastAPI Backend
AI-powered agriculture advisory system for crop prediction and farming guidance.

Run:
    uvicorn main:app --reload

Docs:
    http://127.0.0.1:8000/docs   (Swagger UI)
    http://127.0.0.1:8000/redoc  (ReDoc)
"""

import os
from contextlib import asynccontextmanager
from typing import Optional

import joblib
import numpy as np
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator

from utils.crop_calendar import get_crop_calendar, CropCalendar
from utils.disease_risk import assess_disease_risk
from utils.fertilizer import recommend_fertilizer
from utils.profitability import estimate_profitability
from utils.soil_health import analyze_soil_health
from utils.weather_alert import generate_weather_alert

# ── Environment ────────────────────────────────────────────────────────────────
load_dotenv()

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH   = os.path.join(BASE_DIR, "model", "crop_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "model", "label_encoder.pkl")

# ── Global model state ─────────────────────────────────────────────────────────
_model   = None
_encoder = None


def load_model():
    """Loads the trained model and label encoder from disk."""
    global _model, _encoder
    if not os.path.exists(MODEL_PATH) or not os.path.exists(ENCODER_PATH):
        raise RuntimeError(
            "Model files not found. Please run: python backend/model/train_model.py"
        )
    _model   = joblib.load(MODEL_PATH)
    _encoder = joblib.load(ENCODER_PATH)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan: load model on startup."""
    load_model()
    yield


# ── FastAPI App ────────────────────────────────────────────────────────────────
app = FastAPI(
    title="Krishi AI API",
    description=(
        "AI-powered agriculture advisory API for crop prediction, "
        "soil health analysis, fertilizer recommendations, and more."
    ),
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Allow all origins for development; restrict in production via ALLOWED_ORIGINS env var
# ── CORS Configuration ────────────────────────────────────────────────────────
# ── CORS Configuration ────────────────────────────────────────────────────────

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Pydantic Schemas ───────────────────────────────────────────────────────────

class CropPredictionRequest(BaseModel):
    """Input payload for /predict-crop endpoint."""

    N:           float = Field(..., ge=0,   le=140,  description="Soil Nitrogen content (mg/kg)")
    P:           float = Field(..., ge=0,   le=145,  description="Soil Phosphorus content (mg/kg)")
    K:           float = Field(..., ge=0,   le=205,  description="Soil Potassium content (mg/kg)")
    temperature: float = Field(..., ge=-10, le=50,   description="Average temperature (°C)")
    humidity:    float = Field(..., ge=0,   le=100,  description="Relative humidity (%)")
    ph:          float = Field(..., ge=0,   le=14,   description="Soil pH (0-14 scale)")
    rainfall:    float = Field(..., ge=0,   le=3000, description="Annual rainfall (mm)")
    location:    str   = Field(default="",           description="Farmer location (optional)")
    language:    str   = Field(default="en",         description="Preferred language code (e.g. en, hi)")

    @field_validator("ph")
    @classmethod
    def validate_ph(cls, v: float) -> float:
        if not (0 <= v <= 14):
            raise ValueError("pH must be between 0 and 14")
        return v


class CropPredictionResponse(BaseModel):
    """Response payload for /predict-crop endpoint."""

    recommended_crop:         str
    confidence_score:         float = Field(..., description="Model confidence (0.0 - 1.0)")
    reason:                   str
    soil_health:              str
    fertilizer_recommendation: str
    weather_alert:            str
    disease_risk:             str
    profitability:            str
    crop_calendar:            CropCalendar


class ChatRequest(BaseModel):
    """Input payload for /chat endpoint."""

    message:  str = Field(..., min_length=1, description="User's question in natural language")
    language: str = Field(default="en",      description="Language code for response")


class ChatResponse(BaseModel):
    """Response payload for /chat endpoint."""

    reply: str


# ── Advisory knowledge base for /chat ─────────────────────────────────────────

CHAT_KNOWLEDGE: dict[str, str] = {
    "fertilizer": (
        "Fertilizer use depends on your soil's NPK levels. "
        "Low Nitrogen → apply Urea (46-0-0). "
        "Low Phosphorus → apply DAP or SSP. "
        "Low Potassium → apply MOP (Muriate of Potash). "
        "Always do a soil test before applying fertilizers."
    ),
    "irrigation": (
        "Irrigation needs vary by crop. Drip irrigation saves 40-60% water compared to flood irrigation. "
        "Rice needs standing water; wheat needs 4-6 irrigations; most vegetables need regular watering. "
        "Irrigate during early morning or evening to reduce evaporation."
    ),
    "pest": (
        "Integrated Pest Management (IPM) is recommended. "
        "Use neem-based bio-pesticides as a first line of defense. "
        "For severe infestations, consult the nearest KVK (Krishi Vigyan Kendra). "
        "Avoid over-use of chemical pesticides to prevent resistance."
    ),
    "disease": (
        "Common crop diseases include Blight (fungal), Rust (fungal), and Bacterial Wilt. "
        "High humidity and warm temperatures increase fungal risk. "
        "Use copper-based or systemic fungicides preventively. "
        "Practice crop rotation to break disease cycles."
    ),
    "soil": (
        "Healthy soil has a pH between 6.0 and 7.5. "
        "Acidic soil (pH < 6) → apply lime. Alkaline soil (pH > 7.5) → apply sulfur or gypsum. "
        "Organic matter improves soil structure — add compost or green manure."
    ),
    "weather": (
        "Monitor weather forecasts regularly. "
        "Low rainfall → prepare irrigation systems. "
        "High temperature → use mulching and shade nets. "
        "Frost risk → cover crops with polythene or smoke screens."
    ),
    "crop": (
        "Use the /predict-crop endpoint to get AI-powered crop recommendations "
        "based on your soil (N, P, K, pH) and climate (temperature, humidity, rainfall) data. "
        "Crop selection is the most important decision for maximizing yield and profit."
    ),
    "organic": (
        "Organic farming uses natural inputs: compost, vermicompost, neem cake, cow dung manure. "
        "It improves long-term soil health and commands premium market prices. "
        "Contact your state agriculture department for organic certification procedures."
    ),
    "subsidy": (
        "Indian farmers can access subsidies through PM-KISAN (₹6000/year), "
        "PMFBY (crop insurance), Soil Health Card scheme, and state-level schemes. "
        "Visit your nearest CSC (Common Service Centre) or agriculture office for enrollment."
    ),
    "msp": (
        "Minimum Support Price (MSP) is announced by the Government of India for major crops. "
        "Check the latest MSP on the NAFED or DAC&FW website. "
        "Sell through APMC mandis or FPOs for better price realization."
    ),
}


def generate_chat_reply(message: str, language: str) -> str:
    """
    Generates a rule-based advisory reply for the /chat endpoint.
    Matches keywords from the message against the knowledge base.
    """
    message_lower = message.lower()

    matched_replies = []
    for keyword, reply in CHAT_KNOWLEDGE.items():
        if keyword in message_lower:
            matched_replies.append(reply)

    if matched_replies:
        return " ".join(matched_replies)

    # Generic fallback
    return (
        "Namaste! Welcome to Krishi AI. I can help you with: crop recommendations, "
        "fertilizer advice, irrigation guidance, pest and disease management, "
        "soil health, weather alerts, government subsidies, and MSP information. "
        "Please describe your farming question and I will do my best to assist you. "
        "For crop prediction, use the /predict-crop endpoint with your soil and climate data."
    )


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint — confirms the API is running."""
    return {
        "status":  "ok",
        "message": "Krishi AI API is running",
        "version": "1.0.0",
        "docs":    "/docs",
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """Returns model load status and API health."""
    return {
        "status":       "healthy",
        "model_loaded": _model is not None,
        "encoder_loaded": _encoder is not None,
    }


@app.post(
    "/predict-crop",
    response_model=CropPredictionResponse,
    tags=["Prediction"],
    summary="Predict the best crop for given soil and climate conditions",
)
async def predict_crop(request: CropPredictionRequest):
    """
    Accepts soil nutrient values and climate data, then returns:
    - AI crop recommendation with confidence score
    - Soil health analysis
    - Fertilizer recommendation
    - Weather alert
    - Disease risk assessment
    - Profitability estimate
    - Crop calendar (sowing, harvesting, water requirement)
    """
    if _model is None or _encoder is None:
        raise HTTPException(
            status_code=503,
            detail="Model not loaded. Please train the model first.",
        )

    try:
        # Build feature vector in the same order as training
        features = np.array([[
            request.N,
            request.P,
            request.K,
            request.temperature,
            request.humidity,
            request.ph,
            request.rainfall,
        ]])

        # Predict crop class index and probability distribution
        predicted_index   = _model.predict(features)[0]
        probabilities     = _model.predict_proba(features)[0]
        confidence_score  = float(probabilities[predicted_index])
        crop_name         = _encoder.inverse_transform([predicted_index])[0]

        # Build reason string with top-3 crop alternatives
        top3_indices = np.argsort(probabilities)[::-1][:3]
        top3_crops   = [
            "{} ({:.0f}%)".format(
                _encoder.inverse_transform([i])[0],
                probabilities[i] * 100,
            )
            for i in top3_indices
        ]
        reason = (
            "Based on your soil (N={N}, P={P}, K={K}, pH={ph}) and climate "
            "(temperature={temp}°C, humidity={hum}%, rainfall={rain} mm), "
            "{crop} is the most suitable crop. "
            "Top alternatives: {alts}.".format(
                N=request.N, P=request.P, K=request.K, ph=request.ph,
                temp=request.temperature, hum=request.humidity, rain=request.rainfall,
                crop=crop_name.capitalize(),
                alts=", ".join(top3_crops[1:]),
            )
        )

        return CropPredictionResponse(
            recommended_crop          = crop_name,
            confidence_score          = round(confidence_score, 4),
            reason                    = reason,
            soil_health               = analyze_soil_health(request.ph, request.N, request.P, request.K),
            fertilizer_recommendation = recommend_fertilizer(request.N, request.P, request.K),
            weather_alert             = generate_weather_alert(request.rainfall, request.temperature, request.humidity),
            disease_risk              = assess_disease_risk(request.humidity, request.temperature, request.rainfall),
            profitability             = estimate_profitability(crop_name),
            crop_calendar             = get_crop_calendar(crop_name),
        )

    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Prediction failed: {}".format(str(exc)),
        )


@app.post(
    "/chat",
    response_model=ChatResponse,
    tags=["Advisory Chat"],
    summary="Get agriculture advisory replies via conversational chat",
)
async def chat(request: ChatRequest):
    """
    Accepts a natural language farming question and returns an advisory reply.
    Supports keywords: fertilizer, irrigation, pest, disease, soil, weather,
    crop, organic, subsidy, msp.
    """
    try:
        reply = generate_chat_reply(request.message, request.language)
        return ChatResponse(reply=reply)
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail="Chat processing failed: {}".format(str(exc)),
        )
