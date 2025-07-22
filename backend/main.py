from fastapi import FastAPI, Query
import requests
import os
from dotenv import load_dotenv
import math
import json
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def haversine_distance_miles(coords1: tuple[float, float], coords2: tuple[float, float]):
    latitude1, longitude1 = coords1
    latitude2, longitude2 = coords2
    
    R = 6371

    phi1 = math.radians(latitude1)
    phi2 = math.radians(latitude2)
    dphi = math.radians(latitude2 - latitude1)
    dlambda = math.radians(longitude2 - longitude1)

    a = math.sin(dphi / 2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda / 2)**2
    c = 2*math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c * 0.621371

def get_toll_route_mph(toll: dict, ETL: bool) -> float:
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

    toll_route_res = requests.post(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        headers=headers,
        data=json.dumps(body)
    )
    toll_route_res.raise_for_status()
    toll_route_data = toll_route_res.json()["routes"][0]

    distance_miles = toll_route_data["distanceMeters"] / 1609.34
    duration_hours = float(toll_route_data["duration"][:-1]) / 3600

    return distance_miles / duration_hours

@app.get("/nearbyTolls")
async def get_nearby_tolls(
    latitude: float=Query(...),
    longitude: float=Query(...),
    direction: float=Query(...),
    numTolls: int=Query(3, ge=1)
):
    tolls_decision_data = []
    tolls_res = requests.get(
        f"http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson?AccessCode={WSDOT_TRAVELER_API_KEY}"
    )
    tolls_data = tolls_res.json()
    nearby_tolls = sorted(
        tolls_data, 
        key=lambda t: haversine_distance_miles(
            (latitude, longitude), 
            (t["StartLatitude"], t["StartLongitude"])
        )
    )[:min(numTolls, len(tolls_data))]

    for toll in nearby_tolls:
        GP_speed_mph = get_toll_route_mph(toll, ETL=False)
        ETL_speed_mph = get_toll_route_mph(toll, ETL=True)

        distance_miles = abs(toll["StartMilepost"] - toll["EndMilepost"])

        GP_duration_min = distance_miles / GP_speed_mph * 60
        ETL_duration_min = distance_miles / ETL_speed_mph * 60
        time_saved_min = round(GP_duration_min - ETL_duration_min, 2)

        if time_saved_min > 0:
            speed_boost_mph = round(GP_speed_mph - ETL_speed_mph, 2)
            cost_per_min_saved = round(toll["CurrentToll"] / 100 / time_saved_min, 2)

        else:
            speed_boost_mph = 0.0
            cost_per_min_saved = None

        tolls_decision_data.append({
            "stateRoute": toll["StateRoute"],
            "startLocation": toll["StartLocationName"],
            "endLocation": toll["EndLocationName"],
            "direction": toll["TravelDirection"],
            "cost": round(toll["CurrentToll"] / 100, 2),
            "timeSavedMin": time_saved_min,
            "speedBoostMph": speed_boost_mph,
            "costPerMinSaved": cost_per_min_saved
        })

    return tolls_decision_data

            




        

