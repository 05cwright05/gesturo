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
}

const Table = ({ data, type, onSelect }: Props) => {
  const [selectedId, setSelectedId] = useState("");

  const manageSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  };

  // Reset selectedId whenever data changes
  useEffect(() => {
    setSelectedId("");
  }, [data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.row, selectedId === item.id && styles.selectedRow]}
            onPress={() => manageSelect(item.id)}
          >
            {type === "images" ? (
              <>
                <Image
                  source={item.logo}
                  style={styles.logo}
                  alt={item.details}
                />
                <Text style={styles.cell}>{item.name}</Text>
              </>
            ) : (
              <View style={styles.wordRow}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.details}>{item.details}</Text>
              </View>
            )}
          </Pressable>
        )}
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
    backgroundColor: "blue",
  },
  cell: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  details: {
    fontSize: 16,
    color: "#666",
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default Table;
