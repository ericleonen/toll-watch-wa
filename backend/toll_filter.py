import math

def _get_direction_from_bearing(bearing: float) -> str:
    """
    Returns the direction ("N", "E", "W", or "S") given the bearing (a float).
    """

    if (45 <= bearing < 135):
        return "E"
    if (135 <= bearing < 225):
        return "S"
    if (225 <= bearing < 315):
        return "W"
    else:
        return "N"

def filter_by_direction(tolls: list[dict], bearing: float) -> list[dict]:
    """
    Returns a new list of tolls filtered by travel directions in the same direction as the
    bearing (a float). 
    """
    
    direction = _get_direction_from_bearing(bearing)
    
    return list(filter(
        lambda toll: toll["TravelDirection"] == direction,
        tolls
    ))

def get_distance_miles(coords1: tuple[float, float], coords2: tuple[float, float]) -> float:
    """
    Returns the miles between the two latitude-longitude coordinates (both tuples of floats).
    """
    
    latitude1, longitude1 = coords1
    latitude2, longitude2 = coords2
    
    R = 6371

    phi1 = math.radians(latitude1)
    phi2 = math.radians(latitude2)
    dphi = math.radians(latitude2 - latitude1)
    dlambda = math.radians(longitude2 - longitude1)

    a = math.sin(dphi / 2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda / 2)**2
    c = 2*math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c * 0.621371 

def _get_bearing(start_coords: tuple[float, float], end_coords: tuple[float, float]) -> float:
    """
    Returns the bearing bewteen the start and end latitude-longitude coordinates (both tuples of
    floats).
    """
    
    latitude1, longitude1 = start_coords
    latitude2, longitude2 = end_coords

    start_latitude = math.radians(latitude1)
    start_longitude = math.radians(longitude1)
    end_latitude = math.radians(latitude2)
    end_longitude = math.radians(longitude2)

    diff_longitude = end_longitude - start_longitude
    y = math.sin(diff_longitude) * math.cos(end_latitude)
    x = \
        math.cos(start_latitude) * math.sin(end_latitude) - \
        math.sin(start_latitude) * math.cos(end_latitude) * math.cos(diff_longitude)
    bearing = (math.degrees(math.atan2(y, x)) + 360) % 360

    return bearing

def _get_angle_between_bearings(bearing1: float, bearing2: float) -> float:
    """
    Returns the angle between the given bearings (both floats).
    """
    
    diff = math.abs(bearing1 - bearing2) % 360
    return 360 - diff if diff > 180 else diff

def filter_for_upcoming_tolls(tolls: list[dict], coords: tuple[float, float], bearing: float) -> list[dict]:
    """
    Returns a new list of tolls filtered for tolls that the user may drive forward to. 
    """
    
    return list(filter(
        lambda toll: _get_angle_between_bearings(
            _get_bearing(coords, (tolls["StartLatitude"], tolls["StartLongitude"])),
            bearing
        ) < 90,
        tolls
    ))