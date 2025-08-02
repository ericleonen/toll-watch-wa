from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from validate import validate_client
from wa_tolls import get_tolls
from wa_travel_times import add_etl_gp_travel_times

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # put in the correct origin
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"]
)

@app.get("/nearbyTolls")
async def get_nearby_tolls(
    request: Request,
    direction: str | None = None
):
    validate_client(request)

    toll_groups = get_tolls(direction)
    add_etl_gp_travel_times(toll_groups)

    final_toll_groups = []

    for toll_group in toll_groups:
        GP_speed_mpm = toll_group["GPSpeedMpm"]
        ETL_speed_mpm = toll_group["ETLSpeedMpm"]

        is_ETL_speed_guess = False
        if GP_speed_mpm is not None:
            if ETL_speed_mpm is None:
                ETL_speed_mpm = 45 / 60 # 45 mph is the best guess
                is_ETL_speed_guess = True

        ends = []
        for end in toll_group["ends"]:
            cost_dollars = end["costDollars"]
            distance_miles = end["distanceMiles"]

            if GP_speed_mpm is not None and ETL_speed_mpm is not None:
                ETL_time_min = distance_miles / ETL_speed_mpm
                GP_time_min = distance_miles / GP_speed_mpm
                time_saved_min = max(GP_time_min - ETL_time_min, 0)

                if time_saved_min > 0:
                    time_cost_dollars_per_min = cost_dollars / time_saved_min
                elif cost_dollars > 0:
                    time_cost_dollars_per_min = "inf"
                else:
                    time_cost_dollars_per_min = None
            else:
                time_saved_min = None
                time_cost_dollars_per_min = None

            ends.append({
                "location": end["location"],
                "costDollars": cost_dollars,
                "timeSavedMin": time_saved_min,
                "timeCostDollarsPerMin": time_cost_dollars_per_min
            })

        final_toll_groups.append({
            "stateRoute": toll_group["stateRoute"],
            "direction": toll_group["direction"],
            "startLocation": toll_group["startLocation"],
            "ends": ends,
            "ETLSpeedGuess": is_ETL_speed_guess
        })

    return final_toll_groups

    