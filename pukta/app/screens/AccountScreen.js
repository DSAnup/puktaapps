import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native'
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import colors from '../config/colors';
import Icon from '../components/Icon';

const menuItems = [
    {
        title: 'My Listings',
        icon : {
            name: 'format-list-bulleted',
            backgroundColor: colors.primary
        }
    },
    {
        title: 'My messages',
        icon : {
            name: 'email',
            backgroundColor: colors.secondary
        }
    }
]

function AccountScreen(props) {
    return (
        <Screen style={styles.screen}>
            
            <View style={styles.container}>
                <FlatList 
                 data={menuItems}
                 keyExtractor={menuItems => menuItems.title}
                 ItemSeparatorComponent={ListItemSeparator}
                 ListHeaderComponent={ 
                    <ListItem
                        title="Anup Mondal 2"
                        subtitle="anup12.m@gmail.com"
                        image={require('../assets/mosh.jpg')}
                    />
                }
                 renderItem={({ item}) => 
                    <ListItem title={item.title}
                        IconComponent={
                            <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor}/>
                        }
                    />
                }/>
            </View>
            <ListItem
                title="Log Out"
                IconComponent={
                    <Icon name="logout" backgroundColor='#ffe66d'/>
                }
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light
    },
    container: {
        marginVertical: 5
    }
    
})

export default AccountScreen;