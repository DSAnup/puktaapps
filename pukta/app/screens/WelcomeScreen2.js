import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import colors from '../config/colors';

function WelcomeScreen(props) {
    return (
        <ImageBackground
            blurRadius={10}
            style={styles.background}
            source={require('../assets/backgroundimage1.jpg')}
        >
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/splash-icon.png')}/>
                <Text style={styles.tagline}>Sell What You Don't Need</Text>

            </View>
            <View style={styles.buttonsContainer}>
                <AppButton title="Login" />
                <AppButton title='Register' color='secondary'/>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    buttonsContainer: {
        padding: 20,
        width: '100%'
    },
    registerButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#4ecdc4'
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    tagline: {
        fontSize: 22,
        fontWeight: "600",
        paddingVertical: 20,
        color: colors.white,
    }
    
})

export default WelcomeScreen;