import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.iconText}>🛣️</Text>
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.title}>TollWatch</Text>
        <Text style={styles.subtitle}>WA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#087c5c", // WSDOT green
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  iconText: {
    fontSize: 20,
    color: "#FFF",
  },
  textBlock: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginRight: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFD700", // golden yellow for WA
    fontWeight: "600",
  },
});

export default Logo;
