import TollSign from "@/components/TollSign";
import { useUserLocationAndDirection } from "@/toll-locator/useUserLocationAndDirection";
import { Text, View } from "react-native";

export default function Index() {
  const { location, direction } = useUserLocationAndDirection(2000, 1);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>TollWatch WA</Text>
      <TollSign
        tollName="SR-099 (Southbound) SB S Portal ➔ NB S Portal"
        tollAmount="$2.75"
        costEfficiency="$0.23/min"
        timeSaved="12 min"
        effectiveSpeed="45 mph"
      />
    </View>
  );
}
