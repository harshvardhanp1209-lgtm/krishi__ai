"""
Krishi AI — Model Training Script
Trains a RandomForestClassifier on the crop recommendation dataset,
encodes crop labels, evaluates accuracy, and saves both artifacts with joblib.

Usage:
    python backend/model/train_model.py
"""

import os
import sys

import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_DIR    = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "..", "dataset")
DATASET_PATH = os.path.join(DATASET_DIR, "Crop_recommendation.csv")
GENERATOR_PATH = os.path.join(DATASET_DIR, "generate_dataset.py")

MODEL_PATH   = os.path.join(BASE_DIR, "crop_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

FEATURES = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
TARGET   = "label"


def load_or_generate_dataset() -> pd.DataFrame:
    """Loads the CSV dataset; generates it first if missing."""
    if not os.path.exists(DATASET_PATH):
        print(f"[INFO] Dataset not found at {DATASET_PATH}")
        print("[INFO] Generating synthetic dataset...")
        # Run the generator in-process
        exec(open(GENERATOR_PATH).read(), {"__file__": GENERATOR_PATH})

    print(f"[INFO] Loading dataset from {DATASET_PATH}")
    df = pd.read_csv(DATASET_PATH)
    print(f"[INFO] Dataset shape: {df.shape}")
    print(f"[INFO] Crops found: {sorted(df[TARGET].unique())}\n")
    return df


def train() -> None:
    """Full training pipeline: load → encode → split → train → evaluate → save."""

    # 1. Load data
    df = load_or_generate_dataset()

    # Validate expected columns
    missing_cols = [c for c in FEATURES + [TARGET] if c not in df.columns]
    if missing_cols:
        print(f"[ERROR] Missing columns in dataset: {missing_cols}")
        sys.exit(1)

    X = df[FEATURES].values
    y = df[TARGET].values

    # 2. Encode crop labels to integers
    encoder = LabelEncoder()
    y_encoded = encoder.fit_transform(y)
    print(f"[INFO] Label classes ({len(encoder.classes_)}): {list(encoder.classes_)}\n")

    # 3. Train / test split (80 / 20)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )
    print(f"[INFO] Training samples: {len(X_train)} | Test samples: {len(X_test)}\n")

    # 4. Train RandomForest
    print("[INFO] Training RandomForestClassifier...")
    model = RandomForestClassifier(
        n_estimators=200,      # 200 trees for robust predictions
        max_depth=None,        # let trees grow fully
        min_samples_split=2,
        random_state=42,
        n_jobs=-1,             # use all available CPU cores
    )
    model.fit(X_train, y_train)
    print("[INFO] Training complete.\n")

    # 5. Evaluate
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"[INFO] Test Accuracy: {accuracy * 100:.2f}%\n")
    print("[INFO] Classification Report:")
    print(
        classification_report(
            y_test,
            y_pred,
            target_names=encoder.classes_,
            zero_division=0,
        )
    )

    # 6. Save model and encoder
    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoder, ENCODER_PATH)
    print(f"\n[INFO] Model saved    → {MODEL_PATH}")
    print(f"[INFO] Encoder saved  → {ENCODER_PATH}")
    print("\n[SUCCESS] Training pipeline finished.")


if __name__ == "__main__":
    train()
