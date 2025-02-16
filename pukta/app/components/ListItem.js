import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native'
import AppText from './AppText';
import colors from '../config/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

function ListItem({image, title, subtitle, onPress, renderRightActions, IconComponent}) {
    return (
        <GestureHandlerRootView>
            <Swipeable renderRightActions={renderRightActions}>         
                <TouchableHighlight
                    underlayColor={colors.light}
                    onPress={onPress}
                >
                    <View style={styles.container}>
                        {IconComponent}
                        {image && <Image style={styles.image} source={image}/>}
                        <View style={styles.detailsCotainer}>
                            <AppText style={styles.title}>{title}</AppText>
                            {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeable>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: colors.white
    },
    detailsCotainer: {
        marginLeft: 10,
        justifyContent: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    title: {
        fontWeight: "500",
        color: colors.black
    },
    subtitle: {
        color: colors.medium
    }
})

export default ListItem;