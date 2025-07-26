import {
  Overpass_500Medium,
} from "@expo-google-fonts/overpass";
import {
  ShareTechMono_400Regular,
} from "@expo-google-fonts/share-tech-mono";
import { useFonts } from "expo-font";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DIRECTION_MAP = {
  S: "Southbound",
  N: "Northbound",
  E: "Eastbound",
  W: "Westbound",
};

type TollGroup = {
  stateRoute: string;
  direction: keyof typeof DIRECTION_MAP;
  startLocation: string;
  ends: {
    location: string;
    cost: number;
  }[];
};

type TollSignProps = {
  tollGroup: TollGroup;
};

const TollSign: React.FC<TollSignProps> = ({ tollGroup }) => {
  const {
    stateRoute,
    direction,
    startLocation,
    ends
  } = tollGroup;

  const [fontsLoaded] = useFonts({
    Overpass_500Medium,
    ShareTechMono_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.signWrapper}>
      <View style={styles.header}>
        <Text style={styles.route}>
          SR {stateRoute} {DIRECTION_MAP[direction].toUpperCase()} FROM {startLocation.toUpperCase()}
        </Text>
      </View>
      {
        ends.map((end, index) => (
          <View key={index} style={styles.tollRow}>
            <View style={styles.locationBox}>
              <Text style={styles.locationText}>{end.location.toUpperCase()}</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>${end.cost.toFixed(2)}</Text>
            </View>
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  signWrapper: {
    backgroundColor: "#ffffff",
    borderColor: "#000",
    borderWidth: 4,
    borderRadius: 4,
    overflow: "hidden",
    margin: 16,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 12,
    alignItems: "center",
    borderBottomColor: "#000",
    borderBottomWidth: 2,
  },
  route: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Overpass_500Medium",
  },
  tollRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  locationBox: {
    flex: 1,
    justifyContent: "center",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    fontFamily: "Overpass_500Medium"
  },
  priceBox: {
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 3,
    minWidth: 80,
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "yellow",
    fontFamily: "ShareTechMono_400Regular"
  },
});

export default TollSign;