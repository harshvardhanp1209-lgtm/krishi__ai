"""
Crop Calendar Utility
Provides sowing/harvesting seasons and water requirements for common crops.
"""
from typing import TypedDict


class CropCalendar(TypedDict):
    sowing_time: str
    harvesting_time: str
    water_requirement: str


# Comprehensive crop calendar data
CROP_CALENDAR: dict[str, CropCalendar] = {
    "rice": {
        "sowing_time": "June - July (Kharif season)",
        "harvesting_time": "October - November",
        "water_requirement": "High — 1000-2000 mm per season; needs standing water during growth",
    },
    "wheat": {
        "sowing_time": "October - December (Rabi season)",
        "harvesting_time": "March - April",
        "water_requirement": "Moderate — 400-600 mm per season; 4-6 irrigations needed",
    },
    "maize": {
        "sowing_time": "June - July (Kharif) or February - March (Rabi)",
        "harvesting_time": "September - October or May - June",
        "water_requirement": "Moderate — 500-800 mm per season",
    },
    "cotton": {
        "sowing_time": "April - May (Kharif season)",
        "harvesting_time": "October - February (multiple pickings)",
        "water_requirement": "Moderate-High — 700-1300 mm; critical during boll formation",
    },
    "sugarcane": {
        "sowing_time": "February - March (Spring) or October - November (Autumn)",
        "harvesting_time": "12-18 months after planting",
        "water_requirement": "Very High — 1500-2500 mm per season; needs regular irrigation",
    },
    "jute": {
        "sowing_time": "March - May",
        "harvesting_time": "June - September",
        "water_requirement": "High — 1000-1500 mm; grows well in flood-prone areas",
    },
    "coffee": {
        "sowing_time": "June - July (nursery); transplant after 12 months",
        "harvesting_time": "November - January",
        "water_requirement": "Moderate — 600-800 mm; shade and well-drained soil required",
    },
    "mango": {
        "sowing_time": "July - August (grafted plants transplanted)",
        "harvesting_time": "April - June",
        "water_requirement": "Low-Moderate — 500-800 mm; drought tolerant once established",
    },
    "grapes": {
        "sowing_time": "January - February (pruning and new growth)",
        "harvesting_time": "March - June (depends on variety)",
        "water_requirement": "Moderate — 700-900 mm; drip irrigation recommended",
    },
    "watermelon": {
        "sowing_time": "February - March or June - July",
        "harvesting_time": "60-90 days after sowing",
        "water_requirement": "Moderate — 400-600 mm; reduce near harvest for sweetness",
    },
    "muskmelon": {
        "sowing_time": "February - March",
        "harvesting_time": "May - June",
        "water_requirement": "Moderate — 400-500 mm; drip irrigation preferred",
    },
    "apple": {
        "sowing_time": "December - January (dormant season grafting)",
        "harvesting_time": "August - October (depends on variety)",
        "water_requirement": "Moderate — 600-1000 mm; needs cold winters for fruiting",
    },
    "orange": {
        "sowing_time": "June - August (transplanting)",
        "harvesting_time": "November - March",
        "water_requirement": "Moderate — 750-1200 mm; avoid waterlogging",
    },
    "papaya": {
        "sowing_time": "June - September or February - March",
        "harvesting_time": "8-12 months after planting",
        "water_requirement": "Moderate — 1000-1500 mm; sensitive to waterlogging",
    },
    "coconut": {
        "sowing_time": "April - May or September - October",
        "harvesting_time": "Year-round after 5-7 years; every 45-60 days",
        "water_requirement": "High — 1500-2500 mm; responds well to drip irrigation",
    },
    "banana": {
        "sowing_time": "June - July or February - March",
        "harvesting_time": "10-12 months after planting",
        "water_requirement": "High — 1200-2200 mm per year; needs frequent irrigation",
    },
    "pomegranate": {
        "sowing_time": "July - August or February - March",
        "harvesting_time": "5-7 months after flowering",
        "water_requirement": "Low-Moderate — 500-800 mm; drought tolerant",
    },
    "lentil": {
        "sowing_time": "October - November (Rabi)",
        "harvesting_time": "March - April",
        "water_requirement": "Low — 250-350 mm; mostly rainfed",
    },
    "blackgram": {
        "sowing_time": "June - July (Kharif) or November - December (Rabi)",
        "harvesting_time": "60-90 days after sowing",
        "water_requirement": "Low-Moderate — 300-500 mm",
    },
    "mungbean": {
        "sowing_time": "June - July (Kharif) or March - April (Spring)",
        "harvesting_time": "60-90 days after sowing",
        "water_requirement": "Low — 300-400 mm; drought tolerant",
    },
    "mothbeans": {
        "sowing_time": "July - August",
        "harvesting_time": "September - October",
        "water_requirement": "Very Low — 200-350 mm; highly drought tolerant",
    },
    "pigeonpeas": {
        "sowing_time": "June - July",
        "harvesting_time": "November - March (long duration variety)",
        "water_requirement": "Low — 400-650 mm; tolerates dry spells",
    },
    "kidneybeans": {
        "sowing_time": "June - July (Hills) or October - November (Plains)",
        "harvesting_time": "90-120 days after sowing",
        "water_requirement": "Moderate — 300-500 mm",
    },
    "chickpea": {
        "sowing_time": "October - November (Rabi)",
        "harvesting_time": "February - March",
        "water_requirement": "Low — 250-400 mm; mostly rainfed; 1-2 irrigations at critical stages",
    },
}


def get_crop_calendar(crop_name: str) -> CropCalendar:
    """
    Returns the crop calendar for the given crop.

    Args:
        crop_name: Name of the crop (case-insensitive)

    Returns:
        A CropCalendar TypedDict with sowing_time, harvesting_time, and water_requirement.
    """
    key = crop_name.lower().strip()
    data = CROP_CALENDAR.get(key)

    if data:
        return data

    # Default fallback for unknown crops
    return CropCalendar(
        sowing_time="Consult local agricultural extension officer for sowing schedule",
        harvesting_time="Varies by variety and region — check with local KVK",
        water_requirement="Consult local guidelines for irrigation requirements",
    )
