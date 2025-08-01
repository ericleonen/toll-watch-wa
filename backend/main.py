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

    return toll_groups

    