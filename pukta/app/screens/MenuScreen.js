// screens/ProfileScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import MenuItems from "./MenuItems";
import PropertyListScreen from "./PropertyListScreen";

export default function MenuScreen({ user }) {
    const navigation = useNavigation();
    return (
        <PropertyListScreen/>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
