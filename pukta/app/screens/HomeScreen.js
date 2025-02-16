// screens/HomeScreen.js
import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";

const HomeScreen = ({ user }) => {

  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>Welcome {user.userinfo.FIRSTNAME}</AppText>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
});
