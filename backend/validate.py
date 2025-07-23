"""
Helpers for validating access to this API.
"""

from dotenv import load_dotenv
import os
from fastapi import Request, HTTPException

load_dotenv()

CLIENT_ACCESS_CODE = os.getenv("CLIENT_ACCESS_CODE")

def validate_client(req: Request):
    """
    Raises an HTTPExpection if the given client api key in the header is wrong. Otherwise does
    nothing.
    """
    client_key = req.headers.get("Access-Code")

    if client_key != CLIENT_ACCESS_CODE:
        raise HTTPException(status_code=401, detail="You do not have access.")