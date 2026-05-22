"""
Soil Health Analysis Utility
Analyzes soil pH and nutrient levels to determine soil health status.
"""


def analyze_soil_health(ph: float, N: float, P: float, K: float) -> str:
    """
    Determines soil health based on pH value and nutrient levels.

    Args:
        ph: Soil pH value (0-14 scale)
        N: Nitrogen content (mg/kg)
        P: Phosphorus content (mg/kg)
        K: Potassium content (mg/kg)

    Returns:
        A human-readable string describing the soil health status.
    """
    issues = []

    # pH classification
    if ph < 6.0:
        issues.append("Acidic soil (pH {:.1f}) — consider liming to raise pH".format(ph))
    elif ph > 7.5:
        issues.append("Alkaline soil (pH {:.1f}) — consider sulfur application to lower pH".format(ph))
    else:
        issues.append("Optimal pH ({:.1f}) — well balanced for most crops".format(ph))

    # Nitrogen check
    if N < 20:
        issues.append("Low Nitrogen (N={}) — soil needs nitrogen enrichment".format(N))
    elif N > 140:
        issues.append("High Nitrogen (N={}) — reduce nitrogen inputs to prevent toxicity".format(N))

    # Phosphorus check
    if P < 10:
        issues.append("Low Phosphorus (P={}) — add phosphatic fertilizers".format(P))
    elif P > 145:
        issues.append("High Phosphorus (P={}) — may inhibit zinc and iron uptake".format(P))

    # Potassium check
    if K < 10:
        issues.append("Low Potassium (K={}) — soil needs potash supplementation".format(K))
    elif K > 205:
        issues.append("High Potassium (K={}) — may cause magnesium deficiency".format(K))

    if len(issues) == 1 and "Optimal pH" in issues[0]:
        return "Healthy soil with balanced pH and adequate nutrients. Ideal for crop cultivation."

    return " | ".join(issues)
