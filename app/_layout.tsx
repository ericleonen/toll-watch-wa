import Logo from "@/components/Logo";
import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts
} from "@expo-google-fonts/lato";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [loaded, error] = useFonts({
		Lato_400Regular,
    Lato_700Bold
	});

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: () => <Logo />,
          headerStyle: {
            backgroundColor: "#087c5c",
          },
        }}
      />
    </Stack>
  );
}
