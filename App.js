/**
 * On Track -- React Native App
 * https://github.com/zackshorts/OnTrack
 * CS456 User Experience
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text, TouchableHighlight,
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
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        padding:10,
    }
});

type Props = {};

class Geolocation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            speed: null,
            goal: 6.0
        };
    }

    componentDidMount() {

        setInterval(() => {
           navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed < 0 ? 0 : position.coords.speed,
                        error: null,
                        speedCounter: ++this.state.speedCounter,
                        averageSpeed: (this.state.averageSpeed*(this.state.speedCounter-1)+position.coords.speed)/this.state.speedCounter
                    });
                },
                (error) => this.setState({error: error.message}),
                {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000},
            );
        } , 100);
    }

    // componentWillUnmount() {
    //     // navigator.geolocation.clearWatch(this.watchId);
    // }

    onIncrease = () => {
        let increasedGoal = this.state.goal+(0.1);
        let fixedGoal;
        fixedGoal = parseFloat(increasedGoal.toFixed(1));
        this.setState({
            goal: fixedGoal
        })
        console.log(this.state.speed);
    };

    onDecrease = () => {
        let decreasedGoal = this.state.goal-(0.1);
        let fixedGoal;
        fixedGoal = parseFloat(decreasedGoal.toFixed(1));
        this.setState({
            goal: fixedGoal
        })
        console.log(this.state.speed);

    };

    render() {
        return (

            <View style={styles.main}>
                <Text style={styles.header}>On Track</Text>
                <Text style={styles.text}>Starting Location:</Text> <Text style={styles.text}>({parseFloat(this.state.latitude).toFixed(4)}, {parseFloat(this.state.longitude).toFixed(4)})</Text>
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <Text style={styles.text}>Speed: {this.state.speed} </Text>


                <View>

                    <View style={{flexDirection:'row', marginBottom:10, backgroundColor: '#ddd', justifyContent: 'space-evenly'}}>
                        <TouchableHighlight underlayColor="#878787" style={styles.button} onPress={this.onDecrease}>
                            <Text> Decrease Goal </Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#878787" style={styles.button} onPress={this.onIncrease}>
                            <Text> Increase Goal </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <Text style={styles.text}>
                            { this.state.goal !== 0 ? this.state.goal: null} mph
                        </Text>
                    </View>
                    <View>
                        <TouchableHighlight underlayColor="#878787" style={styles.button}>
                            <Text> Start </Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        );
    }
}



export default Geolocation;
