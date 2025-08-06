import Colors from "@/constants/Colors";
import { DIRECTIONS_MAP } from "@/constants/directions";
import Fonts from "@/constants/Fonts";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

type DirectionSelectorProps = {
  direction: Direction;
  onChange: (direction: Direction) => void;
};

const DIRECTION_ICONS: Record<Direction, string> = {
  N: "arrow-up",
  E: "arrow-forward",
  S: "arrow-down",
  W: "arrow-back",
};

export const DirectionSelector: React.FC<DirectionSelectorProps> = ({ direction, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.label}>
          Travelling {DIRECTIONS_MAP[direction]}
        </Text>
        <Ionicons name="chevron-down" size={18} style={styles.dropdownIcon} />
      </Pressable>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <FlatList
              data={Object.keys(DIRECTION_ICONS) as Direction[]}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={({ pressed }) => [
                    styles.option,
                    pressed && styles.optionPressed
                  ]}
                  onPress={() => {
                    onChange(item);
                    setModalVisible(false);
                  }}
                >
                  <View style={styles.iconBox}>
                    <Ionicons
                      // @ts-ignore
                      name={DIRECTION_ICONS[item]}
                      size={18}
                      color={Colors.DarkGreen}
                    />
                  </View>
                  <Text style={styles.optionLabel}>{DIRECTIONS_MAP[item]}</Text>
                </Pressable>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  selectorButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.White,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightGray
  },
  label: {
    fontSize: 16,
    color: Colors.Black,
    marginRight: 6,
    fontFamily: Fonts.Default.Medium
  },
  dropdownIcon: {
    color: Colors.Gray,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.TransparentBlack
  },
  modalContent: {
    marginHorizontal: 32,
    backgroundColor: Colors.White,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: 400,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  optionPressed: {
    backgroundColor: Colors.LighterGray
  },
  iconBox: {
    backgroundColor: Colors.LightGreen,
    padding: 8,
    borderRadius: 10,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: Colors.Black,
    fontFamily: Fonts.Default.Medium
  },
});