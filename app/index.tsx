import { DirectionSelector } from "@/components/DirectionSelector";
import TollCard from "@/components/TollCard";
import useNearbyTolls from "@/hooks/useNearbyTolls";
import useUserLocationAndBearing from "@/hooks/useUserLocationAndBearing";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const { location, bearing } = useUserLocationAndBearing();
  const [direction, setDirection]= useState<Direction>("N");
  const nearbyTolls = useNearbyTolls(location, direction);

  return (
    <View style={styles.container}>
      <DirectionSelector direction={direction} onChange={newDirection => setDirection(newDirection)}/>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {nearbyTolls.map((toll, index) => (
          <View 
            key={`${toll.stateRoute} | ${toll.startLocation} | ${toll.direction}`} style={styles.tollWrapper}
          >
            <TollCard toll={toll} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // full height
  },
  scrollContent: {
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: "center",
    paddingBottom: 32,
  },
  tollWrapper: {
    marginBottom: 16,
    width: "100%",
  },
});
