from fastapi import FastAPI, Query
import requests
import os
from dotenv import load_dotenv
import math
import json
from fastapi.middleware.cors import CORSMiddleware
from toll_filter import * 

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
    bearing: float=Query(...),
    maxDistanceMiles: float = Query(..., ge=0),
    maxTolls: int = Query(..., ge=1)
):
    tolls_res = requests.get(
        f"http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson",
        params={
            "AccessCode": WSDOT_TRAVELER_API_KEY
        }
    )
    tolls = tolls_res.json()

    tolls = filter_by_direction(tolls, bearing)
    tolls = filter_for_upcoming_tolls(tolls, (latitude, longitude), bearing)

    tolls = [
        {
            "stateRoute": toll["StateRoute"],
            "startLocation": toll["StartLocationName"],
            "endLocation": toll["EndLocationName"],
            "direction": toll["TravelDirection"],
            "cost": round(toll["CurrentToll"] / 100, 2),
            "distanceToStartMiles": dist,
            # temporary
            "StartLatitude": toll["StartLatitude"],
            "StartLongitude": toll["StartLongitude"],
            "EndLatitude": toll["EndLatitude"],
            "EndLongitude": toll["EndLongitude"],
            "StartMilepost": toll["StartMilepost"],
            "EndMilepost": toll["EndMilepost"],
            "CurrentToll": toll["CurrentToll"]
        }
        for toll in tolls
        if (dist := get_distance_miles(
                (latitude, longitude),
                (toll["StartLatitude"], toll["StartLongitude"])
            )) <= maxDistanceMiles
    ]

    tolls = sorted(
        tolls, 
        key=lambda toll: toll["distanceToStartMiles"]
    )[:min(maxTolls, len(tolls))]

    tolls_decision_data = []

    for toll in tolls:
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

        toll_decision_data = toll.copy()

        toll_decision_data["timeSavedMin"] = time_saved_min
        toll_decision_data["speedBoostMph"] = speed_boost_mph
        toll_decision_data["costPerMinSaved"] = cost_per_min_saved

        del toll_decision_data["StartLatitude"]
        del toll_decision_data["StartLongitude"]
        del toll_decision_data["EndLatitude"]
        del toll_decision_data["EndLongitude"]
        del toll_decision_data["StartMilepost"]
        del toll_decision_data["EndMilepost"]
        del toll_decision_data["CurrentToll"]

        tolls_decision_data.append(toll_decision_data)

    return tolls_decision_data

            




        

