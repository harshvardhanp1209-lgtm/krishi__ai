"""
Fertilizer Recommendation Utility
Recommends fertilizers based on soil nutrient deficiencies (N, P, K).
"""


def recommend_fertilizer(N: float, P: float, K: float) -> str:
    """
    Generates fertilizer recommendations based on nutrient levels.

    Args:
        N: Nitrogen content in soil (mg/kg)
        P: Phosphorus content in soil (mg/kg)
        K: Potassium content in soil (mg/kg)

    Returns:
        A string with specific fertilizer recommendations.
    """
    recommendations = []

    # Nitrogen recommendations
    if N < 20:
        recommendations.append(
            "Apply Urea (46-0-0) or Ammonium Nitrate to boost Nitrogen — "
            "suggested dose: 120-150 kg/hectare"
        )
    elif N < 50:
        recommendations.append(
            "Moderate Nitrogen deficit — apply DAP (18-46-0) or compost at 60-80 kg/hectare"
        )

    # Phosphorus recommendations
    if P < 10:
        recommendations.append(
            "Low Phosphorus — apply Single Super Phosphate (SSP) or DAP at 80-100 kg/hectare"
        )
    elif P < 25:
        recommendations.append(
            "Moderate Phosphorus deficit — apply Rock Phosphate or DAP at 40-60 kg/hectare"
        )

    # Potassium recommendations
    if K < 10:
        recommendations.append(
            "Low Potassium — apply Muriate of Potash (MOP) or Sulphate of Potash (SOP) "
            "at 60-80 kg/hectare"
        )
    elif K < 30:
        recommendations.append(
            "Moderate Potassium deficit — apply MOP at 30-40 kg/hectare"
        )

    if not recommendations:
        return (
            "Soil nutrients (N, P, K) are within adequate ranges. "
            "Maintain with balanced NPK fertilizer (e.g., 10-26-26) as a top dressing."
        )

    return " | ".join(recommendations)
