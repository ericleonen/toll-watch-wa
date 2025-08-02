import { DIRECTIONS_MAP } from "@/constants/directions";
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

type Props = {
  direction: Direction;
  onChange: (direction: Direction) => void;
};

const DIRECTION_ICONS: Record<Direction, string> = {
  N: "arrow-up",
  E: "arrow-forward",
  S: "arrow-down",
  W: "arrow-back",
};

export const DirectionSelector: React.FC<Props> = ({ direction, onChange }) => {
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
                  style={styles.option}
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
                      color="#1e90ff"
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
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginRight: 6
  },
  dropdownIcon: {
    color: "#666",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  modalContent: {
    marginHorizontal: 32,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  iconBox: {
    backgroundColor: "#e0f0ff",
    padding: 8,
    borderRadius: 8,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
  },
});