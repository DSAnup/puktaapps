import React from 'react';
import { View } from 'react-native'
import Card from '../components/Card';

function Cards(props) {
    return (
        <View style={{
            backgroundColor: '#f8f4f4',
            padding: 20,
            paddingTop: 100
        }}>
            <Card
                title="Red jacket for sale"
                subTitle="$19"
                image={require("../assets/jacket.jpg")}
            />

        </View>
    );
}

export default Cards;