// screens/WelcomeScreen.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import MenuScreen from "./MenuScreen";

const Tab = createBottomTabNavigator();

const WelcomeScreen = ({ user, setUser }) => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          headerShown: false, // Hide the header
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Menu") {
              iconName = "format-list-bulleted";
            } else if (route.name === "Profile") {
              iconName = "account";
            }

            // Return the appropriate icon
            return <MaterialCommunityIcons 
                      name={iconName}
                      size={size} 
                      color={color} 
                    />;
          },
          tabBarActiveTintColor: "#007BFF",  // Color when tab is active
          tabBarInactiveTintColor: "gray",   // Color when tab is inactive
        })}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen user={user} setUser={setUser} />}
        </Tab.Screen>
        <Tab.Screen name="Menu">
          {() => <MenuScreen user={user} />}
        </Tab.Screen>
        <Tab.Screen name="Profile">
          {() => <ProfileScreen user={user} setUser={setUser} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default WelcomeScreen;
