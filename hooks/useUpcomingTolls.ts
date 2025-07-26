import { LYNNWOOD_TO_BELLEVUE_TOLLS_URL, OBFUSCATED_TOLLWATCH_API_KEY } from "@/constants/API";
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
        // if (!location || !bearing) return;

        axios.get(LYNNWOOD_TO_BELLEVUE_TOLLS_URL, {
            headers: {
                "Access-Code": atob(OBFUSCATED_TOLLWATCH_API_KEY)
            }
        }).then(
            res => setUpcomingTolls(res.data)
        ).catch(err => console.error(err));

    }, []);

    return upcomingTolls;
}