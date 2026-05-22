"""
Disease Risk Assessment Utility
Estimates crop disease risk based on environmental conditions.
"""


def assess_disease_risk(humidity: float, temperature: float, rainfall: float) -> str:
    """
    Assesses the risk of crop diseases based on weather parameters.

    Args:
        humidity: Relative humidity as a percentage
        temperature: Average temperature in °C
        rainfall: Annual rainfall in mm

    Returns:
        A string describing the disease risk level and recommendations.
    """
    risk_factors = []
    risk_level = "LOW"

    # Fungal disease conditions: high humidity + warm temperature
    if humidity > 80 and temperature > 25:
        risk_level = "HIGH"
        risk_factors.append(
            "High fungal disease risk (humidity {:.1f}%, temp {:.1f}°C) — "
            "conditions favor Blight, Rust, and Powdery Mildew".format(humidity, temperature)
        )
        risk_factors.append(
            "Apply preventive fungicides (e.g., Mancozeb, Copper Oxychloride) "
            "and improve field air circulation"
        )

    elif humidity > 70 and temperature > 20:
        risk_level = "MODERATE"
        risk_factors.append(
            "Moderate fungal risk (humidity {:.1f}%, temp {:.1f}°C) — "
            "monitor for early disease symptoms".format(humidity, temperature)
        )
        risk_factors.append("Consider preventive spraying with bio-fungicides")

    # Bacterial disease conditions: high rainfall
    if rainfall > 1500 and temperature > 25:
        if risk_level != "HIGH":
            risk_level = "MODERATE"
        risk_factors.append(
            "Elevated bacterial disease risk due to high rainfall ({:.1f} mm) — "
            "watch for Bacterial Blight and Stem Rot".format(rainfall)
        )

    # Pest risk in dry hot conditions
    if temperature > 35 and humidity < 40:
        if risk_level == "LOW":
            risk_level = "MODERATE"
        risk_factors.append(
            "Increased pest pressure (hot and dry conditions) — "
            "monitor for aphids, mites, and thrips"
        )

    if not risk_factors:
        return (
            "RISK LEVEL: LOW — Current environmental conditions pose minimal disease risk. "
            "Maintain regular field monitoring and standard crop hygiene practices."
        )

    return "RISK LEVEL: {} — ".format(risk_level) + " | ".join(risk_factors)
