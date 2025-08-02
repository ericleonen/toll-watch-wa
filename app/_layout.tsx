import Logo from "@/components/Logo";
import { SettingsProvider } from "@/contexts/SettingsContext";
import {
  Lato_400Regular,
  Lato_700Bold,
  useFonts
} from "@expo-google-fonts/lato";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!loaded || error) return null;

  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <Logo />,
            headerStyle: {
              backgroundColor: "#087c5c",
            },
            headerRight: () => (
              <Link href="/settings" asChild>
                <Pressable style={{ paddingRight: 16 }}>
                  <Ionicons name="options-outline" size={32} color="#fff" />
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerStyle: {
              backgroundColor: "#087c5c",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack>
    </SettingsProvider>
  );
}