type UserLocation = {
  latitude: number,
  longitude: number
};

type Direction = "N" | "S" | "E" | "W";

type Toll = {
    stateRoute: number,
    locations: [string, string],
    distanceBetweenStartAndUserMiles: number,
    cost: number,
    direction: Direction,
    timeSavedMin: number,
    speedBoostMph: number,
    costPerMinSaved: number | null
}