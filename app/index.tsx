import TollSign from "@/components/TollSign";
import { useUserLocationAndDirection } from "@/toll-locator/useUserLocationAndDirection";
import React from "react";
import { ScrollView, View } from "react-native";

export default function Index() {
  const { location, direction } = useUserLocationAndDirection(2000, 1);

  const tollData = [
    {
      tollName: "SR-099 SB S Portal ➔ NB S Portal",
      tollAmount: "$2.75",
      costEfficiency: "$0.23/min",
      timeSaved: "12 min",
      effectiveSpeed: "45 mph",
    },
    {
      tollName: "I-405 Bellevue ➔ Renton",
      tollAmount: "$3.50",
      costEfficiency: "$0.30/min",
      timeSaved: "10 min",
      effectiveSpeed: "55 mph",
    },
    {
      tollName: "SR-167 Auburn ➔ Renton",
      tollAmount: "$1.75",
      costEfficiency: "$0.18/min",
      timeSaved: "9 min",
      effectiveSpeed: "50 mph",
    },
    {
      tollName: "SR-167 Auburn ➔ Renton",
      tollAmount: "$1.75",
      costEfficiency: "$0.18/min",
      timeSaved: "9 min",
      effectiveSpeed: "50 mph",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        alignItems: "center",
      }}
    >
      {tollData.map((toll, index) => (
        <View key={index} style={{ marginBottom: 16, width: "100%" }}>
          <TollSign {...toll} />
        </View>
      ))}
    </ScrollView>
  );
}
