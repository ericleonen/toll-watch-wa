type UserLocation = {
  latitude: number,
  longitude: number
};

type Direction = "N" | "S" | "E" | "W";

type Toll = {
  stateRoute: number,
  direction: Direction,
  startLocation: string,
  ends: TollEnd[],
  ETLSpeedGuess: boolean,
  distanceBetweenStartAndUserMiles: number
}

type TollEnd = {
  location: string,
  costDollars: number,
  timeSavedMin: number | null,
  timeCostDollarsPerMin: null | number | string
}