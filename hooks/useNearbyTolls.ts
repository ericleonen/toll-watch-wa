import { OBFUSCATED_TOLLWATCH_API_KEY, TOLLWATCH_NEARBY_TOLLS_URL } from "@/constants/API";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Hook that provides upcoming tolls data given a location and bearing.
 */
export default function useNearbyTolls(
    location: UserLocation | null, 
    direction: Direction | null
): Toll[] {
    const [nearbyTolls, setNearbyTolls] = useState<Toll[]>([]);

    useEffect(() => {
        if (!location) return;

        axios.get(TOLLWATCH_NEARBY_TOLLS_URL, {
            headers: {
                "Access-Code": atob(OBFUSCATED_TOLLWATCH_API_KEY)
            },
            params: {
                "latitude": location.latitude,
                "longitude": location.longitude,
                "direction": direction
            }
        }).then(
            res => setNearbyTolls(res.data)
        ).catch(err => console.error(err));

    }, [location, direction]);

    return nearbyTolls;
}