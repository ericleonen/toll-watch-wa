import { useSettings } from "@/contexts/SettingsContext";
import {
  Overpass_500Medium,
  Overpass_600SemiBold
} from "@expo-google-fonts/overpass";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useFonts } from "expo-font";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Settings() {
  const { maxCost, minTimeSaved, maxTimeCost, updateSetting } = useSettings();

  const [loaded, error] = useFonts({
    Overpass_600SemiBold,
    Overpass_500Medium,
  });

  if (!loaded || error) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.paragraph}>
          Adjust these sliders to define when a toll is "worth taking" for you. We'll use your preferences to help you decide which express lanes save you time and money.
        </Text>

        {/* Max Cost */}
        <View style={styles.settingCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash-outline" size={22} color="#087c5c" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Maximum Cost</Text>
              <Text style={styles.description}>
                The most you're willing to pay for toll roads
              </Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>${maxCost.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={15}
              step={0.05}
              value={maxCost}
              onValueChange={(val: number) => updateSetting("maxCost", val)}
              minimumTrackTintColor="#087c5c"
              maximumTrackTintColor="#e5e5e5"
              thumbTintColor="#087c5c"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>$0.00</Text>
              <Text style={styles.sliderLabel}>$15.00</Text>
            </View>
          </View>
        </View>

        {/* Min Time Saved */}
        <View style={styles.settingCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="time-outline" size={22} color="#087c5c" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Minimum Time Saved</Text>
              <Text style={styles.description}>
                Only take toll roads that save at least this much time
              </Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>
                {minTimeSaved < 1
                  ? `${(minTimeSaved * 60).toFixed(0)} sec`
                  : `${minTimeSaved.toFixed(1)} min`}
              </Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={0.1}
              value={minTimeSaved}
              onValueChange={(val: number) => updateSetting("minTimeSaved", val)}
              minimumTrackTintColor="#087c5c"
              maximumTrackTintColor="#e5e5e5"
              thumbTintColor="#087c5c"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>0 min</Text>
              <Text style={styles.sliderLabel}>10 min</Text>
            </View>
          </View>
        </View>

        {/* Max Time Cost */}
        <View style={styles.settingCard}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="analytics-outline" size={22} color="#087c5c" />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Max Time Cost</Text>
              <Text style={styles.description}>
                Maximum you'll pay per minute of time saved
              </Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.valueText}>
                ${maxTimeCost.toFixed(2)}/min
              </Text>
            </View>
          </View>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={10}
              step={0.05}
              value={maxTimeCost}
              onValueChange={(val: number) => updateSetting("maxTimeCost", val)}
              minimumTrackTintColor="#087c5c"
              maximumTrackTintColor="#e5e5e5"
              thumbTintColor="#087c5c"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>$0.00</Text>
              <Text style={styles.sliderLabel}>$10.00</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingBottom: 40,
  },
  paragraph: {
    fontSize: 16,
    color: "#555",
    fontFamily: "Overpass_500Medium",
    marginBottom: 28,
    lineHeight: 24,
    backgroundColor: "white",
    padding: 20
  },
  settingCard: {
    marginBottom: 24,
    padding: 16
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(8, 124, 92, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  labelContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 18,
    fontFamily: "Overpass_600SemiBold",
    color: "#2c3e50",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#7f8c8d",
    fontFamily: "Overpass_500Medium",
    lineHeight: 20,
  },
  valueContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 80,
  },
  valueText: {
    fontSize: 18,
    color: "#087c5c",
    fontFamily: "Overpass_600SemiBold",
    textAlign: "right",
  },
  sliderContainer: {
    paddingHorizontal: 4,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#95a5a6",
    fontFamily: "Overpass_500Medium",
  },
});