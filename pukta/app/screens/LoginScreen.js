import React, { useState } from 'react';
import { Alert, Image, StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from 'yup';

import Screen from '../components/Screen';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(4).label("Password")
});

function LoginScreen({props, setUser}) {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await fetch(`https://admin.pukta.us/api/login.cfc?method=authenticate&email=${values.email}&password=${values.password}`);
            const result = await response.json();
            
            if (response.ok && result.status === 'success') {
                const userData = {userinfo: result.USERDATA };
                await AsyncStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            } else {
                Alert.alert("Login Failed", result.message || "Invalid credentials");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen style={styles.container}>
            <Image 
                style={styles.logo}
                source={require("../assets/logo.png")} />

            <AppForm
                initialValues={{ email: '', password: ''}}
                onSubmit={handleLogin}
                validationSchema={validationSchema}
            >
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="email"
                    keyboardType="email-address"
                    name="email"
                    placeholder="Email"
                    textContentType="emailAddress"
                />
                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    icon="lock"
                    name="password"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <SubmitButton title={loading ? "Logging in..." : "Login"} disabled={loading} />
            </AppForm>

        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:50,
        padding: 10,
        // justifyContent:'center',
        // alignItems: "center",    
    },
    logo: {
        width: 240,
        height: 80,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 20
    }
})
export default LoginScreen;