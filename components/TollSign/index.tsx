import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TollSignProps = {
  tollName: string;
  tollAmount: string;
  costEfficiency: string; // e.g. "$1.25/min"
  timeSaved: string;      // e.g. "12 min"
  effectiveSpeed: string; // e.g. "45 mph"
};

const TollSign: React.FC<TollSignProps> = ({
  tollName,
  tollAmount,
  costEfficiency,
  timeSaved,
  effectiveSpeed,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.tollName}>{tollName}</Text>
        <Text style={styles.tollAmount}>{tollAmount}</Text>
      </View>
      <View style={styles.metrics}>
        <Metric label="Cost Efficiency" value={costEfficiency} />
        <Metric label="Time Saved" value={timeSaved} />
        <Metric label="Effective Speed" value={effectiveSpeed} />
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
