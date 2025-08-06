import Colors from "@/constants/Colors";
import { DIRECTIONS_MAP } from "@/constants/directions";
import Fonts from "@/constants/Fonts";
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

  return (
    <View style={styles.container}>
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
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    margin: 10,
    width: "90%",
    maxWidth: 400,
    alignSelf: "center",
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.lightGray
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
    fontFamily: Fonts.Toll.SemiBold,
    textAlign: "center"
  },
  startLocation: {
    color: Colors.darkGray,
    fontSize: 16,
    fontFamily: Fonts.Toll.Medium,
    textAlign: "center"
  },
  startDistance: {
    color: Colors.gray,
  }
});

export default TollCard;