import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import API from "../../api/api";
import ParseComponent from "./ParseComponent";
import LoadingComponent from "./LoadingComponent";

export default class ParseContent extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Epicture </Text>
                <Icon name="logo-instagram" style={styles.text} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    text: {
        fontSize: 24
    },
    image: {

    }
});
