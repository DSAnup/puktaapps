import React, { useEffect, useState } from "react";
import { View } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from './app/screens/LoginScreen';
import WelcomeScreen from "./app/screens/WelcomeScreen";

export default function App() {
  const [user, setUser] = useState(null);
    // Check if user is already logged in
    useEffect(() => {
        const checkLogin = async () => {
            const storedUser = await AsyncStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };
        checkLogin();
    }, []);


  return (
     <View style={{ flex: 1 }}>
        {user ? <WelcomeScreen user={user} setUser={setUser} /> : <LoginScreen setUser={setUser} />}
      </View>
  );
}
