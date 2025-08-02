"""
Helpers for accessing WSDOT tolls data.
"""

from dotenv import load_dotenv
import os
import requests

load_dotenv()

WSDOT_TOLLS_URL = "http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson"
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

def compute_euclidean_distance(coords1: tuple[float, float], coords2: tuple[float, float]) -> float:
    return ((coords1[0] - coords2[0])**2 + (coords1[1] - coords2[1])**2)**0.5

def get_tolls(coords: tuple[float, float], direction: str | None) -> list[dict]:
    """
    Returns all WSDOT tolls data in the given direction grouped by state route and
    start location sorted by distance to the given coords.
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
                "location": toll["EndLocationName"],
                "distanceMiles": abs(start_milepost - toll["EndMilepost"]),
                "costDollars": toll["CurrentToll"] / 100
            } for toll in tolls],
            "distanceBetweenStartAndUserMiles": compute_euclidean_distance(
                (tolls[0]["StartLatitude"], tolls[0]["StartLongitude"]),
                coords
            )
        })

    toll_groups.sort(key=lambda toll_group: toll_group["distanceBetweenStartAndUserMiles"])

    return toll_groups
    

    