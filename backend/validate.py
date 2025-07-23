"""
Helpers for validating access to this API.
"""

from dotenv import load_dotenv
import os
from fastapi import Request, HTTPException

load_dotenv()

CLIENT_API_KEY = os.getenv("CLIENT_API_KEY")

def validate_client(req: Request):
    """
    Raises an HTTPExpection if the given client api key in the header is wrong. Otherwise does
    nothing.
    """
    client_key = req.headers.get("client-api-key")

    if client_key != CLIENT_API_KEY:
        raise HTTPException(status_code=401, detail="You do not have access.")