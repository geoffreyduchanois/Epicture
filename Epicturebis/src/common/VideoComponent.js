
import React from 'react';
import {Dimensions, View, TouchableHighlight, Text, Image, StyleSheet} from 'react-native';
import Video from 'react-native';
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";

export default class VideoComponent extends React.Component {
    constructor( props ) {
        super(props);
        this.state = {
            visible: false
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

    render() {
        return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://www.vid-marketing.com/wp-content/uploads/2017/05/youtube-logo2.jpg' }}
                style={[{ width: this.newWidth, height: this.newHeight, alignSelf: 'stretch'}, styles.image]}
                resizeMode='cover' />
            <View style={styles.description}>
                <Text>
                    <Text>{this.props.data.favorite_count} </Text>
                    <Icon name="ios-heart" style={styles.text} />
                    <Text> </Text>
                    <Text>{this.props.data.comment_count} </Text>
                    <Icon name="ios-chatbubbles" style={styles.text} />
                </Text>
                <Text>
                    <Text style={styles.bold}>{this.props.data.account_url}</Text>
                    <Text> {this.props.data.title}</Text>
                </Text>
                <Text style={styles.italic}>{this.uptime}</Text>
            </View>
        </View>
        )
    }
}
/*<Video
    source={{uri: this.props.video.link}}
    ref={(ref) => {
        this.player = ref
    }}
    style={[{ width: this.newWidth, height: this.newHeight }, styles.video]}
    onBuffer={this.onBuffer}
    onEnd={this.onEnd}
    onError={this.onVideoError}
    repeat={true}
/>*/

/*<VideoPlayer
                video={{uri: this.props.video.link}}
                videoWidth={this.newWidth}
                videoHeight={this.newHeight}
                videoResizeMode={'contain'}
                style={styles.video}
            />*/

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
    video: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    description: {
        paddingHorizontal: 5
    }
});
