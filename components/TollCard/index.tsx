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
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TollEnd from "./TollEnd";

type TollCardProps = {
  toll: Toll;
};

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
        ends.map((end, index) => <TollEnd key={index} {...end}/>)
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
  }
});

export default TollCard;