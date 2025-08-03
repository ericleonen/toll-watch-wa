import Colors from "@/constants/Colors";
import { DIRECTIONS_MAP } from "@/constants/directions";
import { useSettings } from "@/contexts/SettingsContext";
import {
  Overpass_500Medium,
  Overpass_600SemiBold
} from "@expo-google-fonts/overpass";
import {
  ShareTechMono_400Regular
} from "@expo-google-fonts/share-tech-mono";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type TollCardProps = {
  toll: Toll;
};

const suggestionConfig = {
  "take": {
    icon: "checkmark-circle-outline",
    color: Colors.successGreen,
    backgroundColor: Colors.lightSuccessGreen
  },
  "skip": {
    icon: "close-outline",
    color: Colors.failureRed,
    backgroundColor: Colors.lightFailureRed
  }
}

const TollCard: React.FC<TollCardProps> = ({ toll }) => {
  const {
    stateRoute,
    direction,
    startLocation,
    ends,
    ETLSpeedGuess,
    distanceBetweenStartAndUserMiles
  } = toll;

  const [loaded, error] = useFonts({
    ShareTechMono_400Regular,
    Overpass_500Medium,
    Overpass_600SemiBold
  });

  const { maxCost, minTimeSaved, maxTimeCost } = useSettings();

  if (!loaded || error) return null;

  const getSuggestion = (end: TollEnd) => {
    if (
      end.costDollars <= maxCost ||
      (end.timeSavedMin && end.timeSavedMin >= minTimeSaved) ||
      (typeof end.timeCostDollarsPerMin === "number" && end.timeCostDollarsPerMin < maxTimeCost)
    ) {
      return "take";
    } else {
      return "skip";
    }
  }

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.header}>
        <Text style={styles.route}>
          {stateRoute} {DIRECTIONS_MAP[direction].toUpperCase()}
        </Text>
        <Text style={styles.startLocation}>
          From {startLocation} 
          <Text style={styles.startDistance}>{" ·  " + distanceBetweenStartAndUserMiles.toFixed(1)} mi</Text>
        </Text>
      </View>
      {
        ends.map((end, index) => {
          const suggestion = getSuggestion(end);
          const { icon, color, backgroundColor } = suggestionConfig[suggestion];

          return (
            <View key={index} style={styles.endWrapper}>
              <View style={styles.endLocationWrapper}>
                <Text style={styles.endLocation}>{end.location}</Text>
                <View style={{
                  borderColor: color,
                  backgroundColor,
                  ...styles.suggestionTag
                }}>
                  <Ionicons 
                    // @ts-ignore
                    name={icon} 
                    size={16} 
                    color={color} 
                  />
                  <Text 
                    style={{
                      color,
                      ...styles.suggestionText
                    }}
                  >
                    {suggestion.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.metricsRow}>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Cost</Text>
                  <Text style={styles.metricText}>{
                    end.costDollars > 0 ? `$${end.costDollars.toFixed(2)}` : "Free"
                  }</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Time Saved</Text>
                  <Text style={styles.metricText}>{
                    end.timeSavedMin === null ? "-" :
                    end.timeSavedMin === 0 ? "None" :
                    end.timeSavedMin < 1 ? `${(end.timeSavedMin * 60).toFixed(0)} sec` :
                    `${end.timeSavedMin.toFixed(1)} min` 
                  }</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.metricLabel}>Time Cost</Text>
                  {
                    typeof end.timeCostDollarsPerMin === "number" ? (
                      <Text style={styles.metricText}>
                        {
                          end.timeCostDollarsPerMin > 0 ? `$${end.timeCostDollarsPerMin.toFixed(2)}` :
                          "Free"
                        }
                      </Text>
                    ):
                    end.timeCostDollarsPerMin === "inf" ? (
                      <Ionicons name="infinite" style={styles.metricIcon} />
                    ) : (
                      <Text style={styles.metricText}>-</Text>
                    )
                  }
                </View>
              </View>
            </View>
          );
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    margin: 16,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: {
    backgroundColor: Colors.lighterGray,
    padding: 16,
    alignItems: "center",
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1
  },
  route: {
    fontSize: 20,
    color: Colors.black,
    fontFamily: "Overpass_600SemiBold",
    textAlign: "center"
  },
  startLocation: {
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: "Overpass_500Medium",
    textAlign: "center"
  },
  startDistance: {
    color: Colors.gray,
  },
  endWrapper: {
    padding: 16,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    backgroundColor: "#fdfdfd",
  },
  endLocationWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  endLocation: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: "Overpass_600SemiBold",
    color: Colors.black,
  },
  suggestionTag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999
  },
  suggestionText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginLeft: 4,
    lineHeight: 24
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  metric: {
    backgroundColor: Colors.lighterGray,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: "Poppins_500Medium"
  },
  metricText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: Colors.darkGray
  },
  metricIcon: {
    fontSize: 20,
    color: Colors.darkGray,
    marginTop: 4
  }
});

export default TollCard;