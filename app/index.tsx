import TollSign from "@/components/TollSign";
import { useUserLocationAndBearing } from "@/toll-locator/useUserLocationAndBearing";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { location, bearing } = useUserLocationAndBearing(2000, 1);
  const [nearbyTolls, setNearbyTolls] = useState<any[]>([])

  useEffect(() => {
    if (!location || !bearing) return;

    axios.get("https://toll-watch-wa.onrender.com/nearbyTolls", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        bearing,
        numTolls: 5
      }
    }).then(
      (res) => setNearbyTolls(res.data)
    ).catch((err) => console.error(err));

  }, [location, bearing])

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        alignItems: "center",
      }}
    >
      {nearbyTolls.map((toll, index) => (
        <View key={index} style={{ marginBottom: 16, width: "100%" }}>
          <TollSign {...toll} />
        </View>
      ))}
    </ScrollView>
  );
}
