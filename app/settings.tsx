import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
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
              <Ionicons name="cash-outline" size={22} color={Colors.darkGreen} />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Max Cost</Text>
              <Text style={styles.description}>
                What's the most you'll pay for a toll?
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
              minimumTrackTintColor={Colors.darkGreen}
              maximumTrackTintColor={Colors.gray}
              thumbTintColor={Colors.darkGreen}
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
              <Ionicons name="time-outline" size={22} color={Colors.darkGreen} />
            </View>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Min Time Saved</Text>
              <Text style={styles.description}>
                What's the least amount of time you expect to save?
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
              minimumTrackTintColor={Colors.darkGreen}
              maximumTrackTintColor={Colors.gray}
              thumbTintColor={Colors.darkGreen}
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
                How much is a minute of your time worth?
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
              minimumTrackTintColor={Colors.darkGreen}
              maximumTrackTintColor={Colors.gray}
              thumbTintColor={Colors.darkGreen}
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
    flex: 1,
    backgroundColor: Colors.darkWhite
  },
  content: {
    paddingBottom: 40,
  },
  paragraph: {
    fontSize: 16,
    color: Colors.darkGray,
    fontFamily: Fonts.Default.Regular,
    lineHeight: 24,
    backgroundColor: Colors.white,
    padding: 20
  },
  settingCard: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.lightGreen,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  labelContainer: {
    flex: 1,
  },
  labelText: {
    fontSize: 18,
    fontFamily: Fonts.Default.Medium,
    color: Colors.darkGray,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    fontFamily: Fonts.Default.Medium,
  },
  valueContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 80,
  },
  valueText: {
    fontSize: 18,
    color: Colors.darkGreen,
    fontFamily: Fonts.Default.Medium,
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
    color: Colors.gray,
    fontFamily: Fonts.Default.Medium,
  },
});