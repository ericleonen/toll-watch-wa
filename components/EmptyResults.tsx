import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyResultsProps = {
  text: string
}

const EmptyResults: React.FC<EmptyResultsProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search-circle-outline"
        size={48}
        color={Colors.gray}
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
    color: Colors.darkGray,
    textAlign: "center",
    marginTop: 12
  }
});

export default EmptyResults;