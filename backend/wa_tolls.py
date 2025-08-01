"""
Helpers for accessing WSDOT tolls data.
"""

from dotenv import load_dotenv
import os
import requests

load_dotenv()

WSDOT_TOLLS_URL = "http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson"
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

def get_tolls(direction: str | None) -> list[dict]:
    """
    Returns all WSDOT tolls data in the given directiong grouped by state route and
    start location.
    """
    res = requests.get(
        WSDOT_TOLLS_URL,
        params={
            "AccessCode": WSDOT_TRAVELER_API_KEY
        }
    )
    tolls = res.json()

    toll_groups_by_key = {}

    for toll in tolls:
        if not direction is None and toll["TravelDirection"][0].lower() != direction[0].lower():
            continue

        key = (toll["StateRoute"], toll["StartLocationName"])

        if key in toll_groups_by_key:
            toll_groups_by_key[key].append(toll)
        else:
            toll_groups_by_key[key] = [toll]

    toll_groups = []

    for key, tolls, in toll_groups_by_key.items():
        state_route, start_location = key
        start_milepost = tolls[0]["StartMilepost"]
        tolls.sort(key=lambda toll: abs(start_milepost - toll["EndMilepost"]))
        end_milepost = tolls[-1]["EndMilepost"]

        toll_groups.append({
            "stateRoute": state_route,
            "startLocation": start_location,
            "direction": tolls[0]["TravelDirection"],
            "milePosts": [start_milepost, end_milepost],
            "ends": [{
                "distanceMiles": abs(start_milepost - toll["EndMilepost"]),
                "cost": toll["CurrentToll"]
            } for toll in tolls],
            "startCoords": [tolls[0]["StartLatitude"], tolls[0]["StartLongitude"]]
        })

    return toll_groups
    

    