import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/icon.png")} style={styles.icon} />
      <Text style={styles.title}>WA TollView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderColor: Colors.White,
    borderWidth: 2
  },
  title: {
    fontSize: 20,
    color: Colors.White,
    marginRight: 4,
    fontFamily: Fonts.Default.Bold,
    marginLeft: 12
  },
});

export default Logo;
