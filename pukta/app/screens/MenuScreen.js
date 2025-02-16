// screens/ProfileScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

export default function MenuScreen({ user }) {
    const navigation = useNavigation();
    return (
        <Screen style={styles.container}>
            <AppText style={styles.title}>Menu Screen {user.userinfo.FIRSTNAME}</AppText>
            <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
