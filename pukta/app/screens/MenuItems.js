// screens/MenuScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import Screen from "../components/Screen";

const MenuItems = () => {
  const navigation = useNavigation();

  return (
    <Screen style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Page1")}>
        <Ionicons name="document-text-outline" size={24} color="black" />
        <Text style={styles.menuText}>Page 1</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Page2")}>
        <Ionicons name="image-outline" size={24} color="black" />
        <Text style={styles.menuText}>Page 2</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Page3")}>
        <Ionicons name="settings-outline" size={24} color="black" />
        <Text style={styles.menuText}>Page 3</Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default MenuItems;

const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
  menuItem: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#f0f0f0",
    marginVertical: 2,
    borderRadius: 10,
  },
  menuText: { fontSize: 18, marginLeft: 10 },
});
