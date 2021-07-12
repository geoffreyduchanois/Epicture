import React from 'react';
import {ScrollView, View, StyleSheet, Text, Dimensions} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import API from '../api/api'
import LoadingComponent from './common/LoadingComponent'
import ParseComponent from "./common/ParseComponent";
import Icon from "react-native-vector-icons/Ionicons";

export default class TrendsScreen extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            apiRes: [],
            loading: true,
            window: 'day'
        }
        API.get('gallery/top/top/' + this.state.window)
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

    onWindowChange(newWindow) {
        if (newWindow && newWindow != this.state.window) {
            this.setState({
                window: newWindow,
                loading: true
            })
            API.get('gallery/top/top/' + newWindow)
                .then((res) => {
                    this.setState({
                        apiRes: res.data,
                        loading: false
                    })

                }, (err) => {
                    console.log('error: ', err)
                })
        }
    }

    render () {
            return (
                <View style={styles.container}>
                    <RNPickerSelect
                        style={selectStyles}
                        onValueChange={(value) => this.onWindowChange(value)}
                        items={[
                            { label: 'Day', value: 'day' },
                            { label: 'Week', value: 'week' },
                            { label: 'Month', value: 'month' },
                            { label: 'Year', value: 'year' },
                            { label: 'All', value: 'all' },
                        ]}
                        value={this.state.window}
                        Icon={() => {
                            return <Icon name="ios-arrow-down" style={styles.icon} />;
                        }}
                        disabled={this.state.loading}
                    />
                    <ScrollView contentContainerStyle={styles.scrollView}>
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
    icon: {
        fontSize: 24,
        color: 'black',
        marginTop: 8,
        marginRight: 10
    }
});

const selectStyles = StyleSheet.create({
    inputAndroid: {
        width: Dimensions.get('window').width,
        height: 40,
        padding: 5,
        backgroundColor: 'white',
        borderColor: 'lightgrey',
        borderWidth: 1,
        color: 'black',
        paddingRight: 30
    }
})
