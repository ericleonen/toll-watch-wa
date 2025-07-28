import { MetricPills } from "@/components/MetricPills";
import TollSign from "@/components/TollSign";
import useUpcomingTolls from "@/hooks/useUpcomingTolls";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const upcomingTolls = useUpcomingTolls(null, null);
  const [metric, setMetric] = useState<MetricOption>("cost");

  return (
    <View style={styles.container}>
      {/* Fixed header */}
      <MetricPills value={metric} onChange={setMetric} />
      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {upcomingTolls.map((tollGroup, index) => (
          <View key={index} style={styles.tollWrapper}>
            <TollSign tollGroup={tollGroup} metric={metric} />
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
