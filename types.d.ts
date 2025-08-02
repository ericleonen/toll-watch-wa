type UserLocation = {
  latitude: number,
  longitude: number
};

type Direction = "N" | "S" | "E" | "W";

type TollGroup = {
    stateRoute: number,
    direction: Direction,
    startLocation: string
    ends: {
      distanceMiles: number,
      cost: number
    }[]
}

type MetricOption = "cost" | "timeSavedMin" | "costPerMinSaved";