import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  value: MetricOption;
  onChange: (val: MetricOption) => void;
};

const options: { label: string; value: MetricOption }[] = [
  { label: "Cost", value: "cost" },
  { label: "Time Saved", value: "timeSavedMin" },
  { label: "Time Cost", value: "costPerMinSaved" },
];

export const MetricPills: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map((opt) => (
        <TouchableOpacity
          key={opt.value}
          style={[
            styles.pill,
            value === opt.value && styles.selectedPill,
          ]}
          onPress={() => onChange(opt.value)}
        >
          <Text
            style={[
              styles.label,
              value === opt.value && styles.selectedLabel,
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 8,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "center",
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: "#087c5c"
  },
  selectedPill: {
    backgroundColor: "#087c5c",
  },
  label: {
    color: "#087c5c",
    fontSize: 14,
    fontFamily: "Lato_700Bold"
  },
  selectedLabel: {
    color: "#fff",
  },
});
