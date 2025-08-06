import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="car" size={32} color={Colors.White} />
      <Text style={styles.title}>WSDOT TollWatch</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: Colors.White,
    marginRight: 4,
    fontFamily: Fonts.Default.Bold,
    marginLeft: 8
  }
});

export default Logo;
