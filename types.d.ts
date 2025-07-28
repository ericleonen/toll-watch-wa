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
      location: string,
      cost: number,
      timeSavedMin: number,
      costPerMinSaved: number | null
    }[]
}

type MetricOption = "cost" | "timeSavedMin" | "costPerMinSaved";