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
      <Text>Location: ({location?.latitude}, {location?.longitude})</Text>
      <Text>Direction: {direction}</Text>
    </View>
  );
}
