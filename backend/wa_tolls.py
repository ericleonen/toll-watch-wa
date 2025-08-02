"""
Helpers for accessing WSDOT tolls data.
"""

from dotenv import load_dotenv
import os
import requests
import math

load_dotenv()

WSDOT_TOLLS_URL = "http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson"
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

def haversine_miles(coord1: tuple[float, float], coord2: tuple[float, float]):
    # Radius of Earth in miles
    R = 3958.8

    lat1, lon1 = coord1
    lat2, lon2 = coord2

    # Convert degrees to radians
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)

    # Haversine formula
    a = math.sin(dphi / 2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c

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
            "distanceBetweenStartAndUserMiles": haversine_miles(
                (tolls[0]["StartLatitude"], tolls[0]["StartLongitude"]),
                coords
            )
        })

    toll_groups.sort(key=lambda toll_group: toll_group["distanceBetweenStartAndUserMiles"])

    return toll_groups
    

    