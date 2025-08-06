import Fonts from "@/constants/Fonts";
import Themes, { Theme } from "@/constants/Themes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

type SuggestionTagProps = {
    decisionPoints: number
}

const SUGGESTION_CONFIG = {
  "take": {
    icon: "checkmark-circle-outline",
    theme: Theme.Success
  },
  "skip": {
    icon: "close-outline",
    theme: Theme.Failure
  }
}

const SuggestionTag: React.FC<SuggestionTagProps> = ({ decisionPoints }) => {
    let suggestion: "take" | "skip" | null = null;
    if (decisionPoints <= 1) {
        suggestion = "skip";
    } else if (decisionPoints >= 2) {
        suggestion = "take";
    }

    if (!suggestion) {
        return null;
    }

    const { icon, theme } = SUGGESTION_CONFIG[suggestion];
    const { color, backgroundColor } = Themes[theme];

    return (
        <View style={{
            borderColor: color,
            backgroundColor,
            ...styles.container
        }}>
            <Ionicons
                // @ts-ignore
                name={icon}
                size={16}
                color={color}
            />
            <Text style={{
                color,
                ...styles.label
            }}>
                {suggestion.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999
  },
  label: {
    fontFamily: Fonts.Default.Medium,
    fontSize: 14,
    marginLeft: 4,
    lineHeight: 24
  },
})

export default SuggestionTag;