"""
Helpers for accessing WSDOT travel times data.
"""

from dotenv import load_dotenv
import os
import requests

load_dotenv()

WSDOT_TRAVEL_TIME_URL = "http://www.wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimeAsJson"
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

def get_travel_time(travel_time_id: int) -> dict:
    """
    Returns WSDOT travel time data given an id.
    """
    res = requests.get(
        WSDOT_TRAVEL_TIME_URL,
        params={
            "AccessCode": WSDOT_TRAVELER_API_KEY,
            "TravelTimeID": travel_time_id
        }
    )
    travel_time = res.json()

    return travel_time