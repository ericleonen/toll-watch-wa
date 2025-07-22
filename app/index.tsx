import TollSign from "@/components/TollSign";
import { useUserLocationAndDirection } from "@/toll-locator/useUserLocationAndDirection";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { location, direction } = useUserLocationAndDirection(2000, 1);
  const [nearbyTolls, setNearbyTolls] = useState<any[]>([])

  useEffect(() => {
    if (!location || !direction) return;

    axios.get("http://127.0.0.1:8000/nearbyTolls", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        direction,
        numTolls: 3
      }
    }).then(
      (res) => setNearbyTolls(res.data)
    ).catch((err) => console.error(err))

  }, [location, direction])

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
