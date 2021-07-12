import React from 'react';
import {Dimensions, View, Image, TouchableHighlight, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from "moment";
import API from "../../api/api";
import { showMessage, hideMessage } from "react-native-flash-message";

export default class ParseContent extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            lastPress: 0
        }
        this.windowSize = Dimensions.get('window');
        this.widthMax = this.windowSize.width - 40;

        this.imageWidth = this.props.data.cover_width;
        if (this.props.data.cover_width === undefined)
            this.imageWidth = this.props.data.width;

        this.imageHeight = this.props.data.cover_height;
        if (this.props.data.cover_height === undefined)
            this.imageHeight = this.props.data.height;

        this.newWidth = this.widthMax;
        this.coef = this.imageHeight / this.imageWidth
        this.newHeight = this.widthMax * this.coef

        if (isNaN(this.newHeight))
            this.newHeight = this.newWidth;

        this.date = moment.unix(this.props.data.datetime).format("YYYY-MM-DD h:m:s")
        this.uptime = moment(this.date, 'YYYY-MM-DD h:m:s').fromNow()
    }

    onPress() {
        const delta = new Date().getTime() - this.state.lastPress;

        if (delta < 200) {
            API.postImage('/image/' + this.props.image.id + '/favorite')
                .then((res) => {
                }, (err) => {
                    console.log('error: ', err)
                })
            showMessage({
                message: "Added to favorite !",
                type: "success",
                backgroundColor: "white",
                color: "grey",
            });
        }

        this.setState({
            lastPress: new Date().getTime()
        })
    }

    shortenNumber(n) {
        let k = n = Math.floor(n);

        if (n < 10000) return (n.toString().split("."))[0];

        function shorten(a, c) {
            let d = a.toString().split(".");
                return d[0] + c
        }

        k = n / 1e15;	if (k >= 1) return shorten(k, "Q");
        k = n / 1e12;	if (k >= 1) return shorten(k, "T");
        k = n / 1e9;	if (k >= 1) return shorten(k, "B");
        k = n / 1e6;	if (k >= 1) return shorten(k, "M");
        k = n / 1e3;	if (k >= 1) return shorten(k, "K");

    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    ref="button"
                    style={styles.button}
                    onPress={() => this.onPress()}>
                    <Image
                        source={{ uri: this.props.image.link }}
                        style={[{ width: this.newWidth, height: this.newHeight, alignSelf: 'stretch', backgroundColor: 'white'}, styles.image]}
                        resizeMode='cover' />
                </TouchableHighlight>
                <View style={styles.description}>
                    <Text>
                        <Text>{this.shortenNumber(this.props.data.ups)} </Text>
                        <Icon name="ios-heart" style={styles.text} />
                        <Text>   </Text>
                        <Text>{this.shortenNumber(this.props.data.downs)} </Text>
                        <Icon name="ios-heart-dislike" style={styles.text} />
                        <Text>   </Text>
                        <Text>{this.shortenNumber(this.props.data.comment_count)} </Text>
                        <Icon name="ios-chatbubbles" style={styles.text} />
                        <Text>   </Text>
                        <Text>{this.shortenNumber(this.props.data.views)} </Text>
                        <Icon name="md-eye" style={styles.text} />
                    </Text>
                    <Text>
                        <Text style={styles.bold}>{this.props.data.account_url}</Text>
                        <Text> {this.props.data.title}</Text>
                    </Text>
                    <Text style={styles.italic}>{this.uptime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 5,
        backgroundColor: 'white'
    },
    bold: {
        fontWeight: 'bold'
    },
    italic: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'grey'
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    description: {
        paddingHorizontal: 5
    },
    button: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    }
});
