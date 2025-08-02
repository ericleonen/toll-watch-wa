import { LYNNWOOD_TO_BELLEVUE_TOLLS_URL, OBFUSCATED_TOLLWATCH_API_KEY } from "@/constants/API";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Hook that provides upcoming tolls data given a location and bearing.
 */
export default function useNearbyTolls(
    location: UserLocation | null, 
    bearing: number | null
): Toll[] {
    const [nearbyTolls, setNearbyTolls] = useState<Toll[]>([]);

    useEffect(() => {
        // if (!location || !bearing) return;

        axios.get(LYNNWOOD_TO_BELLEVUE_TOLLS_URL, {
            headers: {
                "Access-Code": atob(OBFUSCATED_TOLLWATCH_API_KEY)
            }
        }).then(
            res => setNearbyTolls(res.data)
        ).catch(err => console.error(err));

    }, []);

    return nearbyTolls;
}