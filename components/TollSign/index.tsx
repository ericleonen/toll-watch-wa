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

const DIRECTION_MAP = {
  S: "Southbound",
  N: "Northbound",
  E: "Eastbound",
  W: "Westbound",
};

type TollSignProps = {
  tollGroup: TollGroup,
  metric: MetricOption
};

const TollSign: React.FC<TollSignProps> = ({ tollGroup, metric }) => {
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
    <View style={styles.signWrapper}>
      <View style={styles.header}>
        <Text style={styles.route}>
          I-{stateRoute} {DIRECTION_MAP[direction].toUpperCase()} FROM {startLocation.toUpperCase()}
        </Text>
      </View>
      {
        ends.map((end, index) => (
          <View key={index} style={styles.tollRow}>
            <View style={styles.locationBox}>
              <Text style={styles.locationText}>{end.location} St</Text>
            </View>
            <View style={styles.priceBox}>
              <Text style={styles.priceText}>
                {
                  metric === "cost" ? `$${end.cost.toFixed(2)}` :
                  metric === "timeSavedMin" ? `-${end.timeSavedMin.toFixed(0)} min` :
                  end.costPerMinSaved ? `$${end.costPerMinSaved.toFixed(2)}/min` :
                  " - "
                }
              </Text>
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
    borderWidth: 2,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 0,
    margin: 16,
    width: "90%",
    maxWidth: 400,
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
    color: "#000",
    fontFamily: "Overpass_600SemiBold",
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
    alignItems: "center"
  },
  locationText: {
    fontSize: 22,
    color: "#000",
    fontFamily: "Overpass_600SemiBold",
  },
  priceBox: {
    backgroundColor: "#000",
    paddingVertical: 3,
    paddingHorizontal: 14,
    borderRadius: 4,
    minWidth: 80,
    alignItems: "center"
  },
  priceText: {
    fontSize: 22,
    color: "#f7b345",
    fontFamily: "ShareTechMono_400Regular",
    includeFontPadding: false
  },
});

export default TollSign;