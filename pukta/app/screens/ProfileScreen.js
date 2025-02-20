// screens/ProfileScreen.js
import React from "react";
import { Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

export default function ProfileScreen({ user, setUser }) {
    const handleLogout = async () => {
        await AsyncStorage.removeItem("user"); // Remove user data
        setUser(null); // Redirect to LoginScreen
      };
    
    return (
        <Screen style={styles.container}>
            {/* <AppText style={styles.title}>Profile Screen {user.userinfo.FIRSTNAME}</AppText> */}
            <Button title="Logout" onPress={handleLogout} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
