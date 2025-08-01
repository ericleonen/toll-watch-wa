from dotenv import load_dotenv
import os
import requests

load_dotenv()

WSDOT_TRAVEL_TIMES_URL = "http://wsdot.wa.gov/Traffic/api/TravelTimes/TravelTimesREST.svc/GetTravelTimesAsJson"
WSDOT_TRAVELER_API_KEY = os.getenv("WSDOT_TRAVELER_API_KEY")

def get_monitored_routes() -> tuple[list[dict], list[dict]]:
    res = requests.get(
        WSDOT_TRAVEL_TIMES_URL,
        params={
            "AccessCode": WSDOT_TRAVELER_API_KEY
        }
    )
    routes = res.json()
    
    gps = []
    etl_gp_pairs = []

    for route1 in routes:
        is_route1_gp = True

        for route2 in routes:
            if route1 is route2:
                continue

            # We assume that route1 is the ETL and route2 is the GP
            has_same_start = route1["Description"].startswith(route2["Description"])
            has_etl = "ETL" in route1["Description"] or \
                    "HOV" in route1["Description"]  or \
                    "ETL" in route1["Name"] or \
                    "HOV" in route1["Name"]
            if has_same_start and has_etl:
                is_route1_gp = False
                etl_gp_pairs.append({
                    "milePosts": [route1["StartPoint"]["MilePost"], route1["EndPoint"]["MilePost"]],
                    "ETL_time_min": route1["CurrentTime"],
                    "GP_time_min": route2["CurrentTime"],
                    "stateRoute": route1["StartPoint"]["RoadName"],
                    "direction": route1["StartPoint"]["Direction"]
                })
                break
        if is_route1_gp:
            gps.append({
                "milePosts": [route1["StartPoint"]["MilePost"], route1["EndPoint"]["MilePost"]],
                "ETL_time_min": None,
                "GP_time_min": route1["CurrentTime"],
                "stateRoute": route1["StartPoint"]["RoadName"],
                "direction": route1["StartPoint"]["Direction"]
            }) if is_route1_gp else None

    return etl_gp_pairs, gps

def compute_overlap_score(interval1, interval2):
    start1, end1 = min(interval1), max(interval1)
    start2, end2 = min(interval2), max(interval2)

    overlap_start = max(start1, start2)
    overlap_end = min(end1, end2)

    overlap = max(0, overlap_end - overlap_start)
    length1 = end1 - start1
    length2 = end2 - start2

    denominator = length1 + length2 - overlap

    if denominator == 0:
        return 0
    else:
        return overlap / denominator

def add_etl_gp_travel_times(toll_groups: list[dict]):
    etl_gp_pairs, gps = get_monitored_routes()

    for i, toll_group in enumerate(toll_groups):
        max_overlap_score = 0
        best_etl_gp_pair = None

        for etl_gp_pair in etl_gp_pairs:
            if toll_group["stateRoute"] == etl_gp_pair["stateRoute"] and \
               toll_group["direction"] == etl_gp_pair["direction"]:
                overlap_score = compute_overlap_score(toll_group["milePosts"], etl_gp_pair["milePosts"])
            else:
                overlap_score = 0

            if overlap_score > max_overlap_score:
                max_overlap_score = overlap_score
                best_etl_gp_pair = etl_gp_pair

        if best_etl_gp_pair:
            route_distance_miles = abs(best_etl_gp_pair["milePosts"][0] - best_etl_gp_pair["milePosts"][1])

            toll_groups[i]["ETL_speed_mpm"] = route_distance_miles / best_etl_gp_pair["ETL_time_min"]
            toll_groups[i]["GP_speed_mpm"] = route_distance_miles / best_etl_gp_pair["GP_time_min"]

            continue

        best_gp = None

        for gp in gps:
            if toll_group["stateRoute"] == gp["stateRoute"] and \
               toll_group["direction"] == gp["direction"]:
                overlap_score = compute_overlap_score(toll_group["milePosts"], gp["milePosts"])
            else:
                overlap_score = 0

            if overlap_score > max_overlap_score:
                max_overlap_score = overlap_score
                best_gp = gp

        if best_gp is not None:
            route_distance_miles = abs(best_gp["mileposts"][0] - best_gp["mileposts"][1])

            toll_groups[i]["ETL_speed_mpm"] = None
            toll_groups[i]["GP_speed_mpm"] = route_distance_miles / best_etl_gp_pair["ETL_time_min"]
        else:
            toll_groups[i]["ETL_speed_mpm"] = None
            toll_groups[i]["GP_speed_mpm"] = None