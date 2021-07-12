import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Button } from 'react-native';
import API from '../api/api'
import LoadingComponent from './common/LoadingComponent'
import ParseComponent from "./common/ParseComponent";

export default class FavoriteScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            apiRes: [],
            loading: true,
        }
        API.get('account/redodge/gallery_favorites/')
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
        API.get('account/redodge/favorites/')
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
                    <TouchableOpacity
                        style={styles.button}
                        onPress={(event) => this.onReload()}
                    >
                        <Text> Reload </Text>
                    </TouchableOpacity>
                    {this.renderImg()}
                    <Text style={styles.text}>You should add more Favorite ! (^_^)</Text>
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
    }
});
