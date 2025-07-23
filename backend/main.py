from fastapi import FastAPI, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from toll_filter import * 
from maps import get_toll_route_mph
from wa_tolls import get_all_tolls
from validate import validate_client

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

@app.get("/upcomingTolls")
async def get_upcoming_tolls(
    request: Request,
    latitude: float=Query(...),
    longitude: float=Query(...),
    bearing: float=Query(...),
    maxDistanceMiles: float = Query(3, ge=0),
    maxTolls: int = Query(5, ge=1)
):
    validate_client(request)

    tolls = get_all_tolls()
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
            "locations": [toll["StartLocation"], toll["EndLocation"]],
            "distanceBetweenStartAndUserMiles": toll["distanceBetweenStartAndUserMiles"],
            "cost": round(toll["CurrentToll"] / 100, 2),
            "direction": toll["TravelDirection"],
            "timeSavedMin": time_saved_min,
            "speedBoostMph": speed_boost_mph,
            "costPerMinSaved": cost_per_min_saved
        })

    return tolls_decision_data