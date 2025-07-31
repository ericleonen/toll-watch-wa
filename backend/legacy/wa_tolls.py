"""
Helpers for accessing WSDOT tolls data.
"""

from dotenv import load_dotenv
import os
import requests

load_dotenv()

WSDOT_TOLLS_URL = "http://wsdot.wa.gov/Traffic/api/TollRates/TollRatesREST.svc/GetTollRatesAsJson"
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

def get_all_tolls() -> list[dict]:
    """
    Returns all WSDOT tolls data.
    """
    res = requests.get(
        WSDOT_TOLLS_URL,
        params={
            "AccessCode": WSDOT_TRAVELER_API_KEY
        }
    )
    tolls = res.json()

    return tolls