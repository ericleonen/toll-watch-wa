"""
Helpers for getting information about tolls map data.
"""

from dotenv import load_dotenv
import os
import requests
import json

load_dotenv()

GOOGLE_MAPS_ROUTES_URL = "https://routes.googleapis.com/directions/v2:computeRoutes"
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def get_toll_route_mph(toll: dict, ETL: bool) -> float:
    """
    Returns the speed (MPH) of taking a toll route via ETL or GP (ETL = False).
    """
    
    headers = {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
        "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
    }
    body =  {
        "origin": {
            "location": {
                "latLng": {
                    "latitude": toll["StartLatitude"],
                    "longitude": toll["StartLongitude"]
                }
            }
        },
        "destination": {
            "location": {
                "latLng": {
                    "latitude": toll["EndLatitude"],
                    "longitude": toll["EndLongitude"]
                }
            }
        },
        "travelMode": "DRIVE",
        "routingPreference": "TRAFFIC_AWARE",
        "computeAlternativeRoutes": False,
        "routeModifiers": {
            "avoidTolls": not ETL,
            "avoidHighways": False,
            "avoidFerries": True,
        },
        "languageCode": "en-US"
    }

    res = requests.post(
        GOOGLE_MAPS_ROUTES_URL,
        headers=headers,
        data=json.dumps(body)
    )
    res.raise_for_status()

    route_data = res.json()["routes"][0]
    distance_miles = route_data["distanceMeters"] / 1609.34
    duration_hours = float(route_data["duration"][:-1]) / 3600

    return distance_miles / duration_hours