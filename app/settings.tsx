import Setting from "@/components/Setting";
import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { useSettings } from "@/contexts/SettingsContext";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text
} from "react-native";

export default function Settings() {
  const { maxCost, minTimeSaved, maxTimeCost, updateSetting } = useSettings();

  const [currMaxCost, setCurrMaxCost] = useState(maxCost);
  const [currMinTimeSaved, setCurrMinTimeSaved] = useState(minTimeSaved);
  const [currMaxTimeCost, setCurrMaxTimeCost] = useState(maxTimeCost);

  const [isSaved, setIsSaved] = useState(false);

  const updateSettings = () => {
    updateSetting("maxCost", currMaxCost);
    updateSetting("minTimeSaved", currMinTimeSaved);
    updateSetting("maxTimeCost", currMaxTimeCost);

    setIsSaved(true);
  };

  useEffect(() => {
    setIsSaved(false);
  }, [currMaxCost, currMinTimeSaved, currMaxTimeCost, setIsSaved]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.paragraph}>
          Adjust these sliders to define when a toll is "worth taking" for you. We'll use your preferences to help you decide which express lanes save you time and money.
        </Text>
        <Setting
          label="Max Cost"
          icon="cash-outline"
          description="What's the most you'll py for a toll?"
          minValue={0}
          maxValue={15}
          step={0.05}
          value={currMaxCost}
          setValue={setCurrMaxCost}
          formatValue={(value: number) => `$${value.toFixed(2)}`}
        />
        <Setting
          label="Min Time Saved"
          icon="time-outline"
          description="What's the least amount of time you expect to save?"
          minValue={0}
          maxValue={10}
          step={0.1}
          value={currMinTimeSaved}
          setValue={setCurrMinTimeSaved}
          formatValue={(value: number) => {
            if (value < 1) {
              return `${(value * 60).toFixed(0)} sec`
            } else {
              return `${value.toFixed(1)} min`;
            }
          }}
        />
        <Setting 
          label="Max Time Cost"
          icon="analytics-outline"
          description="How much is a minute of your time worth?"
          minValue={0}
          maxValue={10}
          step={0.05}
          value={currMaxTimeCost}
          setValue={setCurrMaxTimeCost}
          formatValue={(value: number) => `$${value.toFixed(2)}/min`}
        />
        <Pressable 
          onPress={updateSettings}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed
          ]}
        >
          <Text style={styles.saveButtonLabel}>{
            isSaved ? "Saved" : "Save"  
          }</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DarkWhite
  },
  content: {
    paddingBottom: 40
  },
  paragraph: {
    fontSize: 16,
    color: Colors.DarkGray,
    fontFamily: Fonts.Default.Regular,
    lineHeight: 24,
    backgroundColor: Colors.White,
    padding: 20
  },
  saveButton: {
    backgroundColor: Colors.DarkGreen,
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4
  },
  saveButtonPressed: {
    opacity: 0.9
  },
  saveButtonLabel: {
    textAlign: "center",
    color: Colors.White,
    fontFamily: Fonts.Default.Medium,
    fontSize: 16
  }
});