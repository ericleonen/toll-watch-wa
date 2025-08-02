import { useSettings } from "@/contexts/SettingsContext";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

export default function Settings() {
  const { maxCost, minTimeSaved, maxTimeCost, updateSetting } = useSettings();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Worthwhile Toll Settings</Text>

        {/* Max Cost */}
        <View style={styles.settingBlock}>
          <View style={styles.settingLabel}>
            <Ionicons name="cash-outline" size={20} color="#087c5c" />
            <Text style={styles.labelText}>Maximum Cost</Text>
            <Text style={styles.valueText}>${maxCost.toFixed(2)}</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={15}
            step={0.05}
            value={maxCost}
            onValueChange={(val: number) => updateSetting("maxCost", val)}
            minimumTrackTintColor="#087c5c"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#087c5c"
          />
        </View>

        {/* Min Time Saved */}
        <View style={styles.settingBlock}>
          <View style={styles.settingLabel}>
            <Ionicons name="time-outline" size={20} color="#087c5c" />
            <Text style={styles.labelText}>Minimum Time Saved</Text>
            <Text style={styles.valueText}>
              {minTimeSaved < 1
                ? `${(minTimeSaved * 60).toFixed(0)} sec`
                : `${minTimeSaved.toFixed(1)} min`}
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={0.1}
            value={minTimeSaved}
            onValueChange={(val: number) => updateSetting("minTimeSaved", val)}
            minimumTrackTintColor="#087c5c"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#087c5c"
          />
        </View>

        {/* Max Time Cost */}
        <View style={styles.settingBlock}>
          <View style={styles.settingLabel}>
            <Ionicons name="analytics-outline" size={20} color="#087c5c" />
            <Text style={styles.labelText}>Max Time Cost</Text>
            <Text style={styles.valueText}>
              ${maxTimeCost.toFixed(2)} / min
            </Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={0.05}
            value={maxTimeCost}
            onValueChange={(val: number) => updateSetting("maxTimeCost", val)}
            minimumTrackTintColor="#087c5c"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#087c5c"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  content: {
    padding: 24,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#087c5c",
    marginBottom: 24,
    textAlign: "center",
  },
  settingBlock: {
    marginBottom: 32,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    justifyContent: "space-between",
  },
  labelText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  valueText: {
    fontSize: 16,
    color: "#444",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});