import React from 'react';
import {ScrollView, View, StyleSheet, Text, TextInput, Dimensions} from 'react-native';
import API from '../api/api'
import LoadingComponent from './common/LoadingComponent'
import ParseComponent from "./common/ParseComponent";

export default class SearchScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            apiRes: [],
            loading: true,
        }
        API.get('gallery/search?q=')
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

    onChangeInput(input) {
        this.setState({
            loading: true
        })
        API.get('gallery/search?q=' + input)
            .then((res) => {
                this.setState({
                    apiRes: res.data,
                    loading: false
                })

            }, (err) => {
                console.log('error: ', err)
            })
    }

    render () {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onSubmitEditing={(event) => this.onChangeInput(event.nativeEvent.text)}
                    placeholder={'Search'}
                />
                <ScrollView contentContainerStyle={styles.scrollView} removeClippedSubviews={true}>
                    {this.renderImg()}
                    <Text style={styles.text}>Let your imagination speak !</Text>
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
    input: {
        width: Dimensions.get('window').width,
        height: 40,
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
    }
});
