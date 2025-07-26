import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DIRECTION_MAP = {
  S: "Southbound",
  N: "Northbound",
  E: "Eastbound",
  W: "Westbound",
};

type TollSignProps = {
  tollGroup: TollGroup
};

const TollSign: React.FC<TollSignProps> = ({ tollGroup }) => {
  const {
    stateRoute,
    direction,
    startLocation,
    ends
  } = tollGroup;

  return (
    <View style={styles.signWrapper}>
      <View style={styles.header}>
        <Text style={styles.route}>
          SR {stateRoute} {DIRECTION_MAP[direction]} from {startLocation}
        </Text>
      </View>
      {
        ends.map((end) => (
          <View style={styles.tollRow}>
            <Text style={styles.location}>{end.location}</Text>
            <Text style={styles.price}>${end.costPerMinSaved.toFixed(2)}</Text>
          </View>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  signWrapper: {
    backgroundColor: "#fff",
    borderColor: "#444",
    borderWidth: 2,
    borderRadius: 4,
    overflow: "hidden",
    margin: 16,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#e6e6e6",
    padding: 8,
    alignItems: "center",
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
  },
  route: {
    fontSize: 16,
    fontWeight: "bold"
  },
  tollRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  location: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "yellow",
    backgroundColor: "black",
    paddingVertical: 3,
    paddingHorizontal: 12
  }
});

export default TollSign;
