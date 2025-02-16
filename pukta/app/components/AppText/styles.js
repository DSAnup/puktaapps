import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    text: {
        color: 'tomato',
        ...Platform.select({
            ios: {
                fontSize: 20,
                fontFamily: 'Avenir'
            },
            android: {
                fontSize: 20,
                fontFamily: 'Roboto'
            }
        }),
    }
})

export default styles;