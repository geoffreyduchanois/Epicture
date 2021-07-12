import React from 'react';
import {ScrollView, View, StyleSheet, Text, TouchableOpacity, Button, Image} from 'react-native';
import API from '../api/api'
import LoadingComponent from './common/LoadingComponent'
import ParseComponent from "./common/ParseComponent";

export default class ProfileScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            apiRes: [],
            profileRes: [],
            loading: true,
        }

        API.get('account/redodge/')
            .then((res) => {
                this.setState({
                    profileRes: res.data,
                })

            }, (err) => {
                console.log('error: ', err)
            })
        API.get('account/redodge/submissions/')
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
        API.get('account/redodge/submissions/')
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

    render () {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
                    <View style={styles.profile}>
                        <Image
                            source={{ uri: this.state.profileRes.avatar }}
                            style={styles.image}
                            resizeMode='cover' />
                        <Text style={styles.bold}>{this.state.profileRes.url}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={(event) => this.onReload()}
                    >
                        <Text> Reload </Text>
                    </TouchableOpacity>
                    {this.renderImg()}
                    <Text style={styles.text}>You should upload more photos !</Text>
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
        marginBottom: 10
    },
    bold: {
        fontWeight: 'bold'
    },
    image: {
        borderRadius: 50,
        width: 100,
        height: 100
    },
    profile: {
        alignItems: 'center',
        marginBottom: 10,
    }
});
