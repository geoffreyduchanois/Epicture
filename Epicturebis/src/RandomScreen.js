import React from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements'
import API from '../api/api'
import LoadingComponent from './common/LoadingComponent'
import ParseComponent from "./common/ParseComponent";

const widthMax = Dimensions.get("window").width

export default class RandomScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            apiRes: [],
            loading: true,
            nsfw: false,
        }
        API.get('gallery/random/random/')
            .then((res) => {
                this.setState({
                    apiRes: res.data,
                    loading: false
                })

            }, (err) => {
                console.log('error: ', err)
            })
    }

    onReload() {
        this.setState({
            loading: true
        })
        API.get('gallery/random/random/')
            .then((res) => {
                this.setState({
                    apiRes: res.data,
                    loading: false
                })

            }, (err) => {
                console.log('error: ', err)
            })
    }

    renderImg() {
        if (this.state.loading === false) {
            return (<ParseComponent  apiRes={this.state.apiRes} />)
        } else {
            return (<LoadingComponent />)
        }
    }

    nsfwChange() {
        this.setState({
            nsfw: !this.state.nsfw
        })
    }

    render () {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            checked={this.state.nsfw}
                            onPress={(event) => this.nsfwChange()}
                            style={styles.checkbox}
                            title={"NSFW"}
                            containerStyle={styles.button}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={(event) => this.onReload()}
                    >
                        <Text> Reload </Text>
                    </TouchableOpacity>

                    {this.renderImg()}
                </ScrollView>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        justifyContent: 'center',
        padding: 20
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
        color: 'grey'
    },
    button: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 2,
        marginBottom: 10,
        marginTop: 0,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
});
