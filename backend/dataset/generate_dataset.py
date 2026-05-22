"""
Dataset Generator for Krishi AI
Generates a synthetic Crop_recommendation.csv with realistic agronomic ranges.
Run this script once to create the dataset before training the model.
"""

import numpy as np
import pandas as pd
import os

# Seed for reproducibility
np.random.seed(42)

# Crop definitions: name -> (N_range, P_range, K_range, temp_range, humidity_range, ph_range, rainfall_range)
CROP_PROFILES = {
    "rice":        ((60, 120), (30, 60),  (30, 60),  (22, 35), (80, 95), (5.5, 6.5), (150, 300)),
    "wheat":       ((60, 120), (40, 80),  (40, 80),  (10, 25), (40, 70), (6.0, 7.5), (50, 150)),
    "maize":       ((60, 120), (30, 70),  (20, 50),  (18, 30), (55, 85), (5.5, 7.5), (50, 100)),
    "cotton":      ((100,140), (30, 60),  (15, 40),  (24, 40), (50, 80), (5.8, 8.0), (60, 200)),
    "sugarcane":   ((100,140), (30, 60),  (20, 50),  (25, 38), (65, 90), (5.0, 7.0), (100, 250)),
    "jute":        ((60, 100), (40, 80),  (30, 60),  (25, 38), (70, 90), (6.0, 7.0), (150, 300)),
    "coffee":      ((80, 120), (20, 50),  (20, 50),  (15, 28), (55, 80), (6.0, 6.5), (100, 250)),
    "mango":       ((0,  40),  (20, 60),  (30, 60),  (25, 40), (40, 70), (5.5, 7.5), (40,  100)),
    "grapes":      ((20, 40),  (100,145), (200,205), (8,  42), (55, 85), (5.5, 6.5), (50,  150)),
    "watermelon":  ((80, 120), (10, 50),  (40, 80),  (24, 40), (60, 90), (5.5, 7.5), (40,  100)),
    "muskmelon":   ((80, 120), (40, 80),  (40, 80),  (25, 40), (60, 90), (6.0, 7.5), (20,  80)),
    "apple":       ((0,  40),  (10, 50),  (150,200), (0,  24), (50, 80), (5.5, 6.5), (100, 200)),
    "orange":      ((0,  40),  (10, 30),  (10, 30),  (10, 35), (50, 90), (6.0, 7.5), (100, 200)),
    "papaya":      ((40, 80),  (50, 100), (50, 100), (25, 40), (70, 95), (5.5, 7.0), (100, 200)),
    "coconut":     ((0,  40),  (0,  40),  (0,  40),  (22, 38), (80, 95), (5.0, 7.0), (100, 300)),
    "banana":      ((80, 120), (60, 100), (40, 80),  (22, 38), (75, 90), (5.5, 6.5), (100, 200)),
    "pomegranate": ((0,  40),  (10, 50),  (30, 70),  (18, 42), (40, 70), (5.5, 7.0), (40,  110)),
    "lentil":      ((0,  40),  (30, 70),  (10, 40),  (10, 28), (40, 70), (6.0, 8.0), (30,  100)),
    "blackgram":   ((30, 60),  (50, 100), (15, 30),  (25, 38), (60, 80), (5.5, 7.0), (50,  150)),
    "mungbean":    ((10, 40),  (30, 80),  (10, 40),  (25, 38), (60, 80), (6.2, 7.2), (50,  150)),
    "mothbeans":   ((0,  40),  (40, 80),  (20, 40),  (25, 42), (40, 60), (3.5, 6.5), (50,  150)),
    "pigeonpeas":  ((15, 40),  (60, 100), (20, 60),  (20, 38), (40, 70), (5.0, 7.5), (30,  100)),
    "kidneybeans": ((20, 40),  (60, 100), (20, 60),  (15, 30), (50, 80), (5.5, 7.0), (60,  120)),
    "chickpea":    ((40, 80),  (60, 100), (70, 140), (15, 30), (15, 70), (5.6, 7.9), (60,  200)),
}

SAMPLES_PER_CROP = 100  # generates 2400 total rows

rows = []
for crop, (N_r, P_r, K_r, temp_r, hum_r, ph_r, rain_r) in CROP_PROFILES.items():
    for _ in range(SAMPLES_PER_CROP):
        rows.append({
            "N":           np.random.uniform(*N_r),
            "P":           np.random.uniform(*P_r),
            "K":           np.random.uniform(*K_r),
            "temperature": np.random.uniform(*temp_r),
            "humidity":    np.random.uniform(*hum_r),
            "ph":          np.random.uniform(*ph_r),
            "rainfall":    np.random.uniform(*rain_r),
            "label":       crop,
        })

df = pd.DataFrame(rows)
df = df.sample(frac=1, random_state=42).reset_index(drop=True)

out_path = os.path.join(os.path.dirname(__file__), "Crop_recommendation.csv")
df.to_csv(out_path, index=False)
print(f"Dataset saved to {out_path}  ({len(df)} rows, {df['label'].nunique()} crops)")
