import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TollSignProps = {
  stateRoute: string,
  startLocation: string,
  endLocation: string,
  direction: string,
  cost: number,
  timeSavedMin: number,
  speedBoostMph: number,
  costPerMinSaved: number
};

const TollSign: React.FC<TollSignProps> = ({
  stateRoute,
  startLocation,
  endLocation,
  direction,
  cost,
  timeSavedMin,
  speedBoostMph,
  costPerMinSaved
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.tollName}>SR {stateRoute} {startLocation} {">"} {endLocation}</Text>
        <Text style={styles.tollAmount}>${cost}</Text>
      </View>
      <View style={styles.metrics}>
        <Metric label="Implied Time Cost" value={costPerMinSaved ? "$" + costPerMinSaved + "per min" : "N/A"} />
        <Metric label="Time Saved" value={timeSavedMin + " min"} />
        <Metric label="Speed Boost" value={speedBoostMph + " mph"} />
      </View>
    </View>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.metric}>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    elevation: 4,
    margin: 16,
  },
  header: {
    backgroundColor: "#004F8B", // WSDOT deep blue
    padding: 12,
  },
  tollName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  tollAmount: {
    color: "#FFD700", // Toll price in golden yellow
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 4,
  },
  metrics: {
    flexDirection: "column",
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  metric: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  metricLabel: {
    fontSize: 14,
    color: "#555",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
});

export default TollSign;
