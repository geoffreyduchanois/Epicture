import React from 'react';
import ImageComponent from './ImageComponent';
import VideoComponent from './VideoComponent';
import {Text} from "react-native-web";

export default class ParseComponent extends React.Component {
    render() {
        return this.props.apiRes.map((data, index) => {
            if (data.images) {
                if (data.images[0].link.match(/\.(jpg|png|gif)/g)) {
                    return (
                        <ImageComponent
                            image={data.images[0]}
                            data={data}
                            key={'data' + index}/>
                    )
                } else {
                    return (
                        <VideoComponent
                            video={data.images[0]}
                            data={data}
                            key={'data' + index}/>
                    )
                }
            } else {
                if (data.link.match(/\.(jpg|png|gif)/g)) {
                    return (
                        <ImageComponent
                            image={data}
                            data={data}
                            key={'data' + index}/>
                    )
                } else {
                    return (
                        <VideoComponent
                            video={data}
                            data={data}
                            key={'data' + index}/>
                    )
                }
            }
        })
    }
}
