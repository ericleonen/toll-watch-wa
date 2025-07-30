import TollSign from "@/components/TollCard";
import useUpcomingTolls from "@/hooks/useUpcomingTolls";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  const upcomingTolls = useUpcomingTolls(null, null);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {upcomingTolls.map((tollGroup, index) => (
          <View key={index} style={styles.tollWrapper}>
            <TollSign tollGroup={tollGroup} />
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
