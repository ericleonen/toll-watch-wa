import Logo from "@/components/Logo";
import { SettingsProvider } from "@/contexts/SettingsContext";
import {
  Lato_400Regular,
  Lato_700Bold
} from "@expo-google-fonts/lato";
import {
  Poppins_700Bold,
  useFonts
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  const [fontsLoaded, error] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Poppins_700Bold,
  });

  if (!fontsLoaded || error) return null;

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
            headerTitle: () => (
              <Text
                style={{
                  fontFamily: "Poppins_700Bold",
                  fontSize: 20,
                  color: "#fff",
                  marginLeft: 8
                }}
              >
                Settings
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#087c5c",
            },
            headerTintColor: "#fff",
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{ paddingLeft: 16 }}
              >
                <Ionicons name="arrow-back-outline" size={32} color="#fff" />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </SettingsProvider>
  );
}