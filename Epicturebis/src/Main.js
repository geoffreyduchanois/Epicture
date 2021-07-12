import React from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FlashMessage from "react-native-flash-message";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from "./FavoriteScreen";
import TrendsScreen from "./TrendsScreen";
import HeaderComponent from "./common/HeaderComponent";
import RandomScreen from "./RandomScreen";
import SearchScreen from "./SearchScreen";
import ProfileScreen from "./ProfileScreen";
import API from "../api/api";

const Tab = createBottomTabNavigator();

export default class Main extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            profileRes: [],
        }

        API.get('account/redodge/')
            .then((res) => {
                this.setState({
                    profileRes: res.data,
                })

            }, (err) => {
                console.log('error: ', err)
            })
    }

    render () {

        return(
            <NavigationContainer>
                <StatusBar />
                <HeaderComponent style={{zIndex: 1}}/>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = 'md-home';
                            } else if (route.name === 'Favorite') {
                                iconName = 'ios-heart';
                            } else if (route.name === 'Trends') {
                                iconName = 'ios-flame';
                            } else if (route.name === 'Dogs') {
                                iconName = 'ios-paw';
                            } else if (route.name === 'Search') {
                                iconName = 'ios-search';
                            } else if (route.name === 'Random') {
                                iconName = 'md-images';
                            } else if (route.name === 'Profile') {
                                iconName = 'md-contact';
                            }

                            if (route.name === 'Profile') {
                                return <Image
                                    source={{ uri: this.state.profileRes.avatar }}
                                    style={styles.image}
                                    resizeMode='cover' />
                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                    })}
                    tabBarOptions={{
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Trends" component={TrendsScreen} />
                    <Tab.Screen name="Favorite" component={FavoriteScreen} />
                    <Tab.Screen name="Random" component={RandomScreen} />
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="Profile" component={ProfileScreen} />
                </Tab.Navigator>
                <FlashMessage position="bottom" />
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        width: 24,
        height: 24
    },
});
