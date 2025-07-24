import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DIRECTION_MAP = {
  S: "Southbound",
  N: "Northbound",
  E: "Eastbound",
  W: "Westbound",
};

type TollSignProps = {
  toll: Toll
};

const TollSign: React.FC<TollSignProps> = ({ toll }) => {
  const {
    stateRoute,
    locations,
    distanceBetweenStartAndUserMiles,
    cost,
    direction,
    timeSavedMin,
    speedBoostMph,
    costPerMinSaved
  } = toll;

  return (
    <View style={styles.signWrapper}>
      <View style={styles.header}>
        <Text style={styles.route}>SR-{stateRoute} {DIRECTION_MAP[direction]}</Text>
      </View>
      <View style={styles.tollRow}>
        <Text style={styles.location}>{locations[0]} to {locations[1]}</Text>
        <Text style={styles.price}>${cost.toFixed(2)}</Text>
      </View>
      <View style={styles.metricPanel}>
        <Metric label="Time Saved" value={`${timeSavedMin} min`} />
        <Metric label="Speed Boost" value={`${speedBoostMph} mph`} />
        <Metric label="Time Cost" value={costPerMinSaved ? `$${costPerMinSaved.toFixed(2)}/min` : "N/A"} />
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
  signWrapper: {
    backgroundColor: "#fff",
    borderColor: "#444",
    borderWidth: 2,
    borderRadius: 4,
    overflow: "hidden",
    margin: 16,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#e6e6e6",
    padding: 8,
    alignItems: "center",
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
  },
  route: {
    fontSize: 16,
    fontWeight: "bold"
  },
  tollRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "yellow",
    backgroundColor: "black",
    paddingVertical: 3,
    paddingHorizontal: 12
  },
  metricPanel: {
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  metric: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 3,
  },
  metricLabel: {
    fontSize: 13,
    color: "#555",
  },
  metricValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#222",
  },
});

export default TollSign;
