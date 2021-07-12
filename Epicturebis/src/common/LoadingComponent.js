import React from 'react';
import { StyleSheet, Text} from 'react-native';

export default class LoadingComponent extends React.Component {

    render () {
        return(
            <Text style={styles.text}>Searching for the best content exclusively for you !</Text>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        marginTop: 10,
        marginBottom: 10000,
        textAlign: 'center',
        color: 'grey'
    }
});
