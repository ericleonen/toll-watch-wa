import { OBFUSCATED_TOLLWATCH_API_KEY, TOLL_WATCH_UPCOMING_URL } from "@/constants/API";
import axios from "axios";
import { useEffect, useState } from "react";

/**
 * Hook that provides upcoming tolls data given a location and bearing.
 */
export default function useUpcomingTolls(
    location: UserLocation | null, 
    bearing: number | null
): Toll[] {
    const [upcomingTolls, setUpcomingTolls] = useState<Toll[]>([]);

    useEffect(() => {
        if (!location || !bearing) return;

        axios.get(TOLL_WATCH_UPCOMING_URL, {
            params: {
                latitude: location.latitude,
                longitude: location.longitude,
                // bearing,
                maxDistanceMiles: 100,
                maxTolls: 5
            },
            headers: {
                "Access-Code": atob(OBFUSCATED_TOLLWATCH_API_KEY)
            }
        }).then(
            res => setUpcomingTolls(res.data)
        ).catch(err => console.error(err));
    }, [location, bearing]);

    return upcomingTolls;
}