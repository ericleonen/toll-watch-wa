import Colors from "@/constants/Colors";
import Fonts from "@/constants/Fonts";
import Themes, { Theme } from "@/constants/Themes";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type MetricProps = {
  label: string,
  text?: string,
  icon?: string,
  theme: Theme
}

const Metric: React.FC<MetricProps> = ({ label, text, icon, theme }) => {
  if (text && icon) {
    throw new Error("Metric accepts either text or icon. Not both.")
  } else if (!text && !icon) {
    throw new Error("Metric accepts either text or icon. Not neither.")
  }

  const { color } = Themes[theme];

  return (
    <View style={{
      ...styles.container
    }}>
      <Text style={{
        ...styles.label
      }}>{label}</Text>
      {
        text ? (
          <Text style={{
            color,
            ...styles.text
          }}>{text}</Text>
        ) : (
          <Ionicons 
            // @ts-ignore
            name={icon}
            color={color}
            size={22}
          />
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.LighterGray
  },
  label: {
    fontSize: 12,
    color: Colors.Gray,
    fontFamily: Fonts.Default.Medium
  },
  text: {
    fontFamily: Fonts.Default.Medium,
    fontSize: 14
  }
});

export default Metric;