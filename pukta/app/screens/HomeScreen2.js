// screens/HomeScreen.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen2({ navigation }) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem("user"); // Remove stored user data
        navigation.reset({ index: 0, routes: [{ name: "Login" }] }); // Reset navigation to login
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to Home</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
