import { DirectionSelector } from "@/components/DirectionSelector";
import EmptyResults from "@/components/EmptyResults";
import Loader from "@/components/Loader";
import TollCard from "@/components/TollCard";
import useNearbyTolls from "@/hooks/useNearbyTolls";
import useUserLocationAndBearing from "@/hooks/useUserLocationAndBearing";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const { location } = useUserLocationAndBearing();
  const [direction, setDirection]= useState<Direction>("N");
  const nearbyTolls = useNearbyTolls(location, direction);

  return (
    <View style={styles.container}>
      <DirectionSelector direction={direction} onChange={newDirection => setDirection(newDirection)}/>
      {
        nearbyTolls === null ? (
          <View style={styles.centeredContext}>
            <Loader text="Finding tolls" />
          </View>
        ) :
        nearbyTolls.length === 0 ? (
          <View style={styles.centeredContext}>
            <EmptyResults text="No tolls found" />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {nearbyTolls.map((toll) => (
              <View 
                key={`${toll.stateRoute} | ${toll.startLocation} | ${toll.direction}`}
                style={styles.tollWrapper}
              >
                <TollCard toll={toll} />
              </View>
            ))}
          </ScrollView>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredContext: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 128
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
