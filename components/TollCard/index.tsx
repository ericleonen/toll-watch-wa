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

const DIRECTION_MAP = {
  S: "Southbound",
  N: "Northbound",
  E: "Eastbound",
  W: "Westbound",
};

type TollCardProps = {
  tollGroup: TollGroup;
};

const TollCard: React.FC<TollCardProps> = ({ tollGroup }) => {
  const {
    stateRoute,
    direction,
    startLocation,
    ends
  } = tollGroup;

  const [loaded, error] = useFonts({
    ShareTechMono_400Regular,
    Overpass_500Medium,
    Overpass_600SemiBold
  });

  if (!loaded || error) return null;

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.header}>
        <Text style={styles.route}>
          I-{stateRoute} {DIRECTION_MAP[direction].toUpperCase()}
        </Text>
        <Text style={styles.startLocation}>
          FROM {startLocation}
        </Text>
      </View>
      {
        ends.map((end, index) => (
          <View key={index} style={styles.endWrapper}>
            <View style={styles.endLocationWrapper}>
              <Text style={styles.endLocation}>{end.location.toUpperCase()}</Text>
              <View style={styles.takeTag}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#28a745" />
                <Text style={styles.takeText}>TAKE</Text>
              </View>
            </View>

            <View style={styles.metricsRow}>
              <View style={styles.metric}>
                {/* <Ionicons name="cash-outline" size={20} color="#28a745" /> */}
                <Text style={styles.metricLabel}>Cost</Text>
                <Text style={styles.metricText}>{
                  end.cost > 0 ? `$${end.cost.toFixed(2)}` : "Free"
                }</Text>
              </View>
              <View style={styles.metric}>
                {/* <Ionicons name="time-outline" size={20} color="#28a745" /> */}
                <Text style={styles.metricLabel}>Time Saved</Text>
                <Text style={styles.metricText}>{
                  end.timeSavedMin > 0 ? `${end.timeSavedMin.toFixed(1)} min` : "None"
                }</Text>
              </View>
              <View style={styles.metric}>
                {/* <Ionicons name="analytics-outline" size={20} color="#28a745" /> */}
                <Text style={styles.metricLabel}>Time Cost</Text>
                {
                  end.costPerMinSaved === null && end.cost > 0 ? <Ionicons name="infinite" style={styles.metricIcon} /> :
                  end.costPerMinSaved === null ? <Text style={styles.metricText}>-</Text> :
                  <Text style={styles.metricText}>${end.costPerMinSaved.toFixed(2)}</Text>
                }

                
              </View>
            </View>
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: "#ffffffee", // slightly transparent white
    borderRadius: 16,
    overflow: "hidden",
    margin: 16,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  header: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    alignItems: "center",
    borderBottomColor: "#e0e0e0",
    borderBottomWidth: 1,
  },
  route: {
    fontSize: 20,
    color: "#222",
    fontFamily: "Overpass_600SemiBold",
    textAlign: "center"
  },
  startLocation: {
    color: "#666",
    fontSize: 16,
    fontFamily: "Overpass_500Medium",
    textAlign: "center",
    marginTop: 4
  },
  endWrapper: {
    padding: 16,
    borderBottomColor: "#eee",
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
    fontFamily: "Overpass_600SemiBold",
    color: "#111",
  },
  takeTag: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#28a745",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 14,
    backgroundColor: "#e9f9ee",
  },
  takeText: {
    color: "#28a745",
    fontFamily: "Overpass_500Medium",
    fontSize: 14,
    marginLeft: 4,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  metric: {
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  metricLabel: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Overpass_500Medium"
  },
  metricText: {
    fontFamily: "Overpass_500Medium",
    fontSize: 16,
    color: "#222"
  },
  metricIcon: {
    fontSize: 20,
    color: "#222",
    marginTop: 4
  }
});

export default TollCard;