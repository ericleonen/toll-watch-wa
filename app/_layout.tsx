import Logo from "@/components/Logo";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <Logo />,
          headerStyle: {
            backgroundColor: "#00643C",
          },
        }}
      />
    </Stack>
  );
}
