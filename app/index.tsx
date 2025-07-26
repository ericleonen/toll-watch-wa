import TollSign from "@/components/TollSign";
import useUpcomingTolls from "@/hooks/useUpcomingTolls";
// import useUserLocationAndBearing from "@/hooks/useUserLocationAndBearing";
import { ScrollView, View } from "react-native";

export default function Index() {
  // const { location, bearing } = useUserLocationAndBearing(2000, 1);
  const upcomingTolls = useUpcomingTolls(null, null);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        alignItems: "center",
      }}
    >
      {upcomingTolls.map((tollGroup, index) => (
        <View key={index} style={{ marginBottom: 16, width: "100%" }}>
          <TollSign tollGroup={tollGroup} />
        </View>
      ))}
    </ScrollView>
  );
}
