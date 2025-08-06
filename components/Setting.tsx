import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SettingProps = {
  label: string,
  icon: string,
  description: string,
  minValue: number,
  maxValue: number,
  step: number,
  value: number,
  setValue: React.Dispatch<React.SetStateAction<number>>,
  formatValue: (value: number) => string
}

const Setting: React.FC<SettingProps> = ({
  label,
  icon,
  description,
  minValue,
  maxValue,
  step,
  value,
  setValue,
  formatValue
}) => {
  return (
    <View style={styles.container}>
        <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
            <Ionicons 
              // @ts-ignore
              name={icon} 
              size={22} 
              color={Colors.darkGreen}
            />
        </View>
        <View style={styles.labelContainer}>
            <Text style={styles.labelText}>{label}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.valueContainer}>
            <Text style={styles.valueText}>{formatValue(value)}</Text>
        </View>
        </View>
        <View style={styles.sliderContainer}>
        <Slider
            style={styles.slider}
            minimumValue={minValue}
            maximumValue={maxValue}
            step={step}
            value={value}
            onValueChange={(value: number) => setValue(value)}
            minimumTrackTintColor={Colors.darkGreen}
            maximumTrackTintColor={Colors.gray}
            thumbTintColor={Colors.darkGreen}
        />
        <View style={styles.sliderLabels}>
            <Text style={styles.sliderLabel}>{formatValue(minValue)}</Text>
            <Text style={styles.sliderLabel}>{formatValue(maxValue)}</Text>
        </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray
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
    height: 32,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4
  },
  sliderLabel: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: Fonts.Default.Medium,
  }
});

export default Setting;