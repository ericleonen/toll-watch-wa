from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from toll_filter import * 
from maps import get_toll_route_mph
from wa_tolls import get_all_tolls
from validate import validate_client
from wa_travel_times import get_travel_time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/lynnwoodToBellevueTolls")
async def get_lynnwood_to_bellevue_tolls_data(
    request: Request
):
    validate_client(request)

    tolls = [
        toll for toll in get_all_tolls()
        if (
            toll["StateRoute"] == "405" and
            toll["TravelDirection"] == "S" and
            toll["StartLocationName"] == "SR 524" and
            toll["EndLocationName"] in ["NE 128th", "NE 85th", "NE 6th"]
        )
    ]
    tolls = sorted(tolls, key=lambda toll: -toll["EndMilepost"])

    ETL_travel_time = get_travel_time(37)
    GP_travel_time = get_travel_time(38)

    ETL_speed_mpm = ETL_travel_time["Distance"] / ETL_travel_time["CurrentTime"]
    GP_speed_mpm = GP_travel_time["Distance"] / GP_travel_time["CurrentTime"]

    toll_decision_data = {
        "stateRoute": 405,
        "direction": "S",
        "startLocation": "SR 524",
        "ends": []
    }

    for toll in tolls:
        distance_miles = abs(toll["EndMilepost"] - toll["StartMilepost"])

        ETL_duration_min = distance_miles / ETL_speed_mpm
        GP_duration_min = distance_miles / GP_speed_mpm
        time_saved_min = GP_duration_min - ETL_duration_min

        if time_saved_min <= 0:
            cost_per_min_saved = None
        else:
            cost_per_min_saved = toll["CurrentToll"] / 100 / time_saved_min

        toll_decision_data["ends"].append({
            "location": toll["EndLocationName"],
            "cost": round(toll["CurrentToll"] / 100, 2),
            "time_saved_min": time_saved_min,
            "cost_per_min_saved": cost_per_min_saved
        })

    return [toll_decision_data]

@app.get("/upcomingTolls")
async def get_upcoming_tolls(
    request: Request,
    latitude: float = Query(...),
    longitude: float = Query(...),
    bearing: float | None = Query(None),
    maxDistanceMiles: float = Query(3, ge=0),
    maxTolls: int = Query(5, ge=1)
):
    validate_client(request)

    tolls = get_all_tolls()

    if bearing is not None:
        tolls = filter_by_direction(tolls, bearing)
        tolls = filter_for_upcoming_tolls(tolls, (latitude, longitude), bearing)
        
    tolls = [
        {
            **toll,
            "distanceBetweenStartAndUserMiles": dist,
        }
        for toll in tolls
        if (dist := get_distance_miles(
                (latitude, longitude),
                (toll["StartLatitude"], toll["StartLongitude"])
            )) <= maxDistanceMiles
    ]
    tolls = sorted(
        tolls, 
        key=lambda toll: toll["distanceBetweenStartAndUserMiles"]
    )[:min(maxTolls, len(tolls))]

    tolls_decision_data = []

    for toll in tolls:
        GP_speed_mph = get_toll_route_mph(toll, ETL=False)
        ETL_speed_mph = get_toll_route_mph(toll, ETL=True)

        distance_miles = abs(toll["StartMilepost"] - toll["EndMilepost"])

        GP_duration_min = distance_miles / GP_speed_mph * 60
        ETL_duration_min = distance_miles / ETL_speed_mph * 60
        time_saved_min = GP_duration_min - ETL_duration_min

        if time_saved_min > 0:
            speed_boost_mph = round(ETL_speed_mph - GP_speed_mph, 2)
            cost_per_min_saved = round(toll["CurrentToll"] / 100 / time_saved_min, 2)

        else:
            time_saved_min = 0
            speed_boost_mph = 0.0
            cost_per_min_saved = None

        tolls_decision_data.append({
            "stateRoute": toll["StateRoute"],
            "locations": [toll["StartLocationName"], toll["EndLocationName"]],
            "distanceBetweenStartAndUserMiles": toll["distanceBetweenStartAndUserMiles"],
            "cost": round(toll["CurrentToll"] / 100, 2),
            "direction": toll["TravelDirection"],
            "timeSavedMin": time_saved_min,
            "speedBoostMph": speed_boost_mph,
            "costPerMinSaved": cost_per_min_saved
        })

    return tolls_decision_data