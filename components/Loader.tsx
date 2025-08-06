import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

type LoaderProps = {
  text: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={48}
        color={Colors.Gray}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: Fonts.Default.Medium,
    fontSize: 16,
    color: Colors.DarkGray,
    textAlign: "center",
    marginTop: 12
  }
});

export default Loader;