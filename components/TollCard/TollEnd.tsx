import Colors from "@/constants/Colors";
import { Theme } from "@/constants/Themes";
import { useSettings } from "@/contexts/SettingsContext";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Metric from "./Metric";
import SuggestionTag from "./SuggestionTag";

const TollEnd: React.FC<TollEnd> = ({
    location,
    costDollars,
    timeSavedMin,
    timeCostDollarsPerMin
}) => {
    const { maxCost, minTimeSaved, maxTimeCost } = useSettings();

    let decisionPoints = 0;
    
    let costMetricTheme = Theme.Failure;
    if (costDollars <= maxCost) {
        costMetricTheme = Theme.Success;
        decisionPoints += 1;
    }

    let timeSavedMetricTheme = Theme.Failure;
    if (timeSavedMin === null) {
        timeSavedMetricTheme = Theme.Neutral;
    } else if (timeSavedMin >= minTimeSaved) {
        timeSavedMetricTheme = Theme.Success;
        decisionPoints += 1;
    }

    let timeCostMetricTheme = Theme.Failure;
    if (timeCostDollarsPerMin === null) {
        timeCostMetricTheme = Theme.Neutral;
    } else if (
        typeof timeCostDollarsPerMin === "number" &&
        timeCostDollarsPerMin <= maxTimeCost
    ) {
        timeCostMetricTheme = Theme.Success;
        decisionPoints += 1;
    }

    return (
        <View style={styles.wrapper}>
            <View style={styles.locationWrapper}>
                <Text style={styles.location}>
                    {location}
                </Text>
                <SuggestionTag decisionPoints={decisionPoints} />
            </View>
            <View style={styles.metricsRow}>
                <Metric 
                  label="Cost"
                  text={costDollars > 0 ? `$${costDollars.toFixed(2)}` : "Free"}
                  theme={costMetricTheme}
                />
                <Metric 
                  label="Time Saved"
                  text={
                    timeSavedMin === null ? "-" :
                    timeSavedMin === 0 ? "None" :
                    timeSavedMin < 1 ? `${(timeSavedMin * 60).toFixed(0)} sec` :
                    `${timeSavedMin.toFixed(1)} min` 
                  }
                  theme={timeSavedMetricTheme}
                />
                <Metric
                  label="Time Cost"
                  text={
                    typeof timeCostDollarsPerMin === "number" ? (
                      timeCostDollarsPerMin > 0 ? `$${timeCostDollarsPerMin.toFixed(2)}/min` :
                      "Free"
                    ):
                    timeCostDollarsPerMin === null ? "-" : undefined
                  }
                  icon={
                    timeCostDollarsPerMin === "inf" ? "infinite": undefined
                  }
                  theme={timeCostMetricTheme}
                />
              </View>
        </View>
    )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    backgroundColor: "#fdfdfd",
  },
  locationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  location: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "Overpass_600SemiBold",
    color: Colors.black,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  }
})

export default TollEnd;