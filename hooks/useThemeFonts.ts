import { Overpass_500Medium, Overpass_600SemiBold } from "@expo-google-fonts/overpass";
import { Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

export default function useThemeFonts(): boolean {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Overpass_500Medium,
    Overpass_600SemiBold
  });

  return loaded && !error;
}