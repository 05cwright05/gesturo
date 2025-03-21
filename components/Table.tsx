import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";

interface Item {
  id: string;
  name: string;
  details: string;
  logo: any;
}

interface Props {
  data: Item[];
  type: "words" | "images";
  onSelect: (id: string) => void;
  setter: (id: string) => void;
  selected: string;
}

const Table = ({ data, type, onSelect, setter, selected }: Props) => {
  const [selectedId, setSelectedId] = useState("");

  const manageSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
    setter(id);
  };

  // Reset selectedId whenever data changes
  useEffect(() => {
    setSelectedId(selected);
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedId === item.id;
          return (
            <Pressable
              style={({ pressed }) => [
                styles.row,
                isSelected && styles.selectedRow,
                pressed && !isSelected && styles.pressedRow,
              ]}
              onPress={() => manageSelect(item.id)}
            >
              {type === "images" ? (
                <>
                  <Image
                    source={item.logo}
                    style={styles.logo}
                    alt={item.details}
                  />
                  <Text
                    style={[styles.cell, isSelected && styles.selectedText]}
                  >
                    {item.name}
                  </Text>
                </>
              ) : (
                <View style={styles.wordRow}>
                  <Text
                    style={[styles.cell, isSelected && styles.selectedText]}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.details, isSelected && styles.selectedText]}
                  >
                    {item.details}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  wordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  selectedRow: {
    backgroundColor: "#3B82F6", // A nicer blue
    borderLeftWidth: 4,
    borderLeftColor: "#1D4ED8", // Darker blue for accent
  },
  pressedRow: {
    backgroundColor: "#F3F4F6", // Light gray when pressed
  },
  cell: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
    fontWeight: "500",
  },
  details: {
    fontSize: 16,
    color: "#666",
  },
  selectedText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default Table;
