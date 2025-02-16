import React from 'react';
import { View } from 'react-native'
import AppText from '../components/AppText';
import {MaterialCommunityIcons} from '@expo/vector-icons';

function Styling(props) {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            
            <MaterialCommunityIcons name='email' size={60}/>
            <AppText>I love React Native</AppText>

        </View>
    );
}

export default Styling;