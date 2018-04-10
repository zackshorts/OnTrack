/**
 * On Track -- React Native App
 * https://github.com/zackshorts/OnTrack
 * CS456 User Experience
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontFamily: 'AppleSDGothicNeo-Thin'

    },
    welcome: {
        fontSize: 45,
        textAlign: 'center',
        margin: 10,
        marginTop:30,
        color: 'white',
        fontFamily: 'AppleSDGothicNeo-Thin'
    },
    main: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',

    },
    text: {
        color: 'white',
        fontFamily: 'AppleSDGothicNeo-Thin',
        fontSize: 30,
        textAlign: 'center'
    },
    header: {
        color: 'white',
        fontFamily: 'AppleSDGothicNeo-Medium',
        fontSize: 50,
        textAlign: 'center',
        marginBottom:30
    }
});

type Props = {};

class Geolocation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // latitude: null,
            // longitude: null,
            // error: null,
            // speed: []

        };
    }

    componentDidMount() {
        this.watchId = navigator.geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    speed: position.coords.speed,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: .000001 },
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    render() {
        return (

            <View style={styles.main}>
                <Text style={styles.header}>On Track</Text>
                <Text style={styles.text}>Starting Location:</Text> <Text style={styles.text}>({this.state.latitude}, {this.state.longitude})</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Text style={styles.text}>Speed: {this.state.speed} </Text>

            </View>


        );
    }
}

export default Geolocation;
