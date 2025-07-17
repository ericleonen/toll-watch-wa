import * as Location from "expo-location";
import { useEffect, useState } from "react";

type UserLocation = {
  latitude: number,
  longitude: number
};

type UserDirection = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
const DIRECTIONS: UserDirection[] = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export function useUserLocationAndDirection(
  timeInterval: number = 2000, 
  distanceInterval: number = 1
) {
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [direction, setDirection] = useState<UserDirection | null>(null);
  const [prevLocation, setPrevLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied")
        return;
      }

      subscription = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
        
        timeInterval: 2000,
        distanceInterval: 1
      }, (loc) => {
        console.log("hi")
        const { latitude, longitude } = loc.coords;
        const currLocation = { latitude, longitude }
        setLocation(currLocation);

        if (prevLocation) {
          const userDirection = getDirection(prevLocation, currLocation);
          setDirection(userDirection);
        }

        setPrevLocation({ latitude, longitude });
      })
    })();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { location, direction };
}

function getDirection(prevLocation: UserLocation, currLocation: UserLocation): UserDirection {
  const startLat = toRad(prevLocation.latitude);
  const startLng = toRad(prevLocation.longitude);
  const endLat = toRad(currLocation.latitude);
  const endLng = toRad(currLocation.longitude);

  const dLng = endLng - startLng;
  const y = Math.sin(dLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
  const bearing = (toDeg(Math.atan2(y, x)) + 360) % 360;

  const directionIndex = Math.round(bearing / 45) % 8;

  return DIRECTIONS[directionIndex];
}

function toRad(deg: number): number {
  return deg * Math.PI / 180;
}

function toDeg(rad: number): number {
  return rad * 180 / Math.PI;
}