import React from 'react';
import {ScrollView, View, StyleSheet, Text, Dimensions, TouchableOpacity, StatusBar} from 'react-native';


import Main from "./src/Main";
import {NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const widthMax = Dimensions.get("window").width
const heightMax = Dimensions.get("window").height

export default class App extends React.Component {
    constructor (props) {
        super(props)
        this.state= {
            login: false
        }
    }

    login() {
        this.setState({login: true})
    }

    render () {
        if (this.state.login === false) {
            return (
                <NavigationContainer>
                    <StatusBar />
                    <View style={styles.container}>
                        <Ionicons name={"logo-instagram"} size={124} color={'black'}/>
                        <Text style={styles.text}>Epicture</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={(event) => this.login()}>
                            <Text> Login with your account </Text>
                        </TouchableOpacity>
                    </View>
                </NavigationContainer>
            )
        } else {
            return (
                <Main/>
            );
        }
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 2,
        marginBottom: 10,
        width: widthMax - 40
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
        height: heightMax - 100,
        justifyContent: 'center'
    }
});
