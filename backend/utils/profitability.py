"""
Crop Profitability Assessment Utility
Returns profitability estimates for common crops based on market data and yield patterns.
"""

# Crop profitability mapping: crop_name -> (level, avg_yield_per_hectare, notes)
CROP_PROFITABILITY_MAP = {
    "rice": ("Medium", "4-6 tonnes/ha", "Stable demand; profits depend on MSP and water availability"),
    "wheat": ("Medium", "3-5 tonnes/ha", "Consistent government support; moderate input costs"),
    "maize": ("Medium-High", "5-8 tonnes/ha", "Growing demand for animal feed and ethanol"),
    "cotton": ("High", "2-3 tonnes/ha", "Cash crop with strong export demand; higher input cost"),
    "sugarcane": ("High", "70-100 tonnes/ha", "Long-term crop with assured sugar mill procurement"),
    "jute": ("Medium", "2-3 tonnes/ha", "Eco-friendly fiber crop; niche but stable market"),
    "coffee": ("High", "0.8-1.5 tonnes/ha", "Premium export crop; high initial investment required"),
    "mango": ("High", "10-15 tonnes/ha", "High-value fruit; good export potential"),
    "grapes": ("Very High", "15-20 tonnes/ha", "Premium fruit; high investment with high returns"),
    "watermelon": ("Medium-High", "20-30 tonnes/ha", "Short duration crop; good summer returns"),
    "muskmelon": ("Medium", "15-20 tonnes/ha", "Good market demand during summer season"),
    "apple": ("High", "15-25 tonnes/ha", "High-altitude crop with premium market prices"),
    "orange": ("Medium-High", "10-15 tonnes/ha", "Good demand; profits depend on variety and market"),
    "papaya": ("High", "30-50 tonnes/ha", "Quick returns; high yield with low input costs"),
    "coconut": ("Medium-High", "5-10 tonnes/ha (nuts)", "Long-term perennial crop with consistent income"),
    "banana": ("High", "30-40 tonnes/ha", "High-demand fruit; multiple income sources from plant"),
    "pomegranate": ("High", "10-15 tonnes/ha", "Growing domestic and export demand; drought tolerant"),
    "lentil": ("Medium", "1-1.5 tonnes/ha", "Pulse crop with good nutritional and market value"),
    "blackgram": ("Medium", "0.8-1.2 tonnes/ha", "Short duration; good as rotational crop"),
    "mungbean": ("Medium", "0.8-1.2 tonnes/ha", "Short duration pulse; improves soil nitrogen"),
    "mothbeans": ("Low-Medium", "0.5-0.8 tonnes/ha", "Drought-tolerant; grown in arid regions"),
    "pigeonpeas": ("Medium", "1-1.5 tonnes/ha", "Deep-rooted; good for dryland farming"),
    "kidneybeans": ("Medium-High", "1.5-2 tonnes/ha", "Good export market; high nutritional value"),
    "chickpea": ("Medium", "1-2 tonnes/ha", "High protein demand; good rabi season crop"),
}


def estimate_profitability(crop_name: str) -> str:
    """
    Returns profitability assessment for the given crop.

    Args:
        crop_name: Name of the crop (case-insensitive)

    Returns:
        A formatted string with profitability level, yield estimate, and market notes.
    """
    key = crop_name.lower().strip()
    data = CROP_PROFITABILITY_MAP.get(key)

    if data:
        level, yield_est, notes = data
        return (
            "Profitability: {level} | "
            "Average Yield: {yield_est} | "
            "{notes}".format(level=level, yield_est=yield_est, notes=notes)
        )

    return (
        "Profitability data not available for '{crop}'. "
        "Consult local agriculture department for market rates and yield estimates.".format(
            crop=crop_name
        )
    )
