import Logo from "@/components/Logo";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { SettingsProvider } from "@/contexts/SettingsContext";
import useThemeFonts from "@/hooks/useThemeFonts";
import { Ionicons } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  const fontsReady = useThemeFonts();

  if (!fontsReady) {
    return null;
  }

  return (
    <SettingsProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <Logo />,
            headerStyle: {
              backgroundColor: Colors.darkGreen,
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
                  fontFamily: Fonts.Default.Bold,
                  fontSize: 20,
                  color: Colors.white,
                  marginLeft: 8
                }}
              >
                Settings
              </Text>
            ),
            headerStyle: {
              backgroundColor: Colors.darkGreen,
            },
            headerTintColor: Colors.white,
            headerLeft: () => (
              <Pressable
                onPress={() => router.back()}
                style={{ paddingLeft: 16 }}
              >
                <Ionicons name="arrow-back-outline" size={32} color={Colors.white} />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </SettingsProvider>
  );
}