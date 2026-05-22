"""
Weather Alert Utility
Generates weather-related agricultural alerts based on rainfall and temperature.
"""


def generate_weather_alert(rainfall: float, temperature: float, humidity: float) -> str:
    """
    Generates weather alerts relevant to farming conditions.

    Args:
        rainfall: Annual rainfall in mm
        temperature: Average temperature in °C
        humidity: Relative humidity as a percentage

    Returns:
        A string describing weather-related warnings or status.
    """
    alerts = []

    # Rainfall alerts
    if rainfall < 50:
        alerts.append(
            "CRITICAL: Very low rainfall ({:.1f} mm) — immediate irrigation required; "
            "consider drip or sprinkler systems".format(rainfall)
        )
    elif rainfall < 200:
        alerts.append(
            "LOW RAINFALL WARNING ({:.1f} mm) — plan supplemental irrigation; "
            "use mulching to retain soil moisture".format(rainfall)
        )
    elif rainfall > 2500:
        alerts.append(
            "HEAVY RAINFALL ALERT ({:.1f} mm) — high waterlogging risk; "
            "ensure proper field drainage and raised bed farming".format(rainfall)
        )
    elif rainfall > 1500:
        alerts.append(
            "HIGH RAINFALL ({:.1f} mm) — monitor for waterlogging and root rot; "
            "maintain drainage channels".format(rainfall)
        )

    # Temperature alerts
    if temperature > 38:
        alerts.append(
            "HEAT STRESS WARNING ({:.1f}°C) — crops may experience heat stress; "
            "increase irrigation frequency and use shade nets".format(temperature)
        )
    elif temperature > 35:
        alerts.append(
            "HIGH TEMPERATURE ALERT ({:.1f}°C) — monitor crops for wilting; "
            "irrigate during early morning or evening".format(temperature)
        )
    elif temperature < 5:
        alerts.append(
            "FROST RISK ({:.1f}°C) — protect sensitive crops with frost covers or "
            "smoke screens".format(temperature)
        )
    elif temperature < 10:
        alerts.append(
            "LOW TEMPERATURE ALERT ({:.1f}°C) — cold-sensitive crops may be affected; "
            "use protective covers at night".format(temperature)
        )

    # Humidity alerts
    if humidity > 85:
        alerts.append(
            "HIGH HUMIDITY ({:.1f}%) — increased risk of fungal diseases; "
            "ensure good crop ventilation".format(humidity)
        )

    if not alerts:
        return (
            "Weather conditions are favorable for farming. "
            "Temperature {:.1f}°C and rainfall {:.1f} mm are within normal ranges.".format(
                temperature, rainfall
            )
        )

    return " | ".join(alerts)
