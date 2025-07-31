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
  "Northbound": "arrow-up",
  "Eastbound": "arrow-forward",
  "Southbound": "arrow-down",
  "Westbound": "arrow-back",
};

export const DirectionSelector: React.FC<Props> = ({ direction, onChange }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable
        style={styles.selectorButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.label}>Travelling {direction}</Text>
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
              numColumns={1}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Ionicons
                    // @ts-ignore
                    name={DIRECTION_ICONS[item]}
                    size={20}
                    style={styles.optionIcon}
                  />
                  <Text style={styles.optionLabel}>
                    {item}
                  </Text>
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
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center"
  },
  icon: {
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center"
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  modalContent: {
    marginHorizontal: 32,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  optionIcon: {
    marginRight: 8,
  },
  optionLabel: {
    fontSize: 16,
  },
});
