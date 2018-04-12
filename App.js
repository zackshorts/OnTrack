/**
 * On Track -- React Native App
 * https://github.com/zackshorts/OnTrack
 * BYU CS456 User Experience
 *
 * Created by Zack Shorts
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
        fontFamily: 'AppleSDGothicNeo-Thin',
        fontSize: 60,
        textAlign: 'center',
        marginBottom:30,
        fontWeight: '300'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        padding:10,
        borderRadius: 10
    },
    leftButton: {
        marginRight: 18
    }
});

type Props = {};

// Import the react-native-sound module
let Sound = require('react-native-sound');

// Enable playback in silence mode
Sound.setCategory('Playback');

var speed_up_sound = new Sound('voice_speed_up.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
});

// Play the sound with an onEnd callback
speed_up_sound.play((success) => {
    if (success) {
        console.log('successfully finished playing');
    } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        speed_up_sound.reset();
    }
});

let refreshIntervalId;

class Geolocation extends Component {


    constructor(props) {
        super(props);

        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            speed: 0.0,
            goal: 6.0,
            speedCounter: 0,
            averageSpeed: 0.0
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onIncrease = () => {
        let increasedGoal = this.state.goal+(0.1);
        let fixedGoal;
        fixedGoal = parseFloat(increasedGoal.toFixed(1));
        this.setState({
            goal: fixedGoal
        });
        console.log(this.state.speed);
    };

    onDecrease = () => {
        let decreasedGoal = this.state.goal-(0.1);
        let fixedGoal;
        fixedGoal = parseFloat(decreasedGoal.toFixed(1));
        this.setState({
            goal: fixedGoal
        });
        console.log(this.state.speed);
    };

    onStart = () => {
        refreshIntervalId = setInterval(() => {
            if(this.state.averageSpeed < this.state.goal && this.state.speedCounter % 4 === 0) speed_up_sound.play();
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        speed: position.coords.speed <= 0 ? 0.00 : position.coords.speed*2.23694, //This will convert m/s to mph
                        error: null,
                        speedCounter: ++this.state.speedCounter,
                        averageSpeed: ((this.state.averageSpeed*(this.state.speedCounter-1)+this.state.speed)/this.state.speedCounter)
                    });
                },

                (error) => this.setState({error: error.message}),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
            );
        } , 4000);
    };

    onStop = () => {

        clearInterval(refreshIntervalId);
    };

    onReset = () => {
        this.setState({
            speed: 0,
            averageSpeed: 0,
            speedCounter: 0
        });
    }

    render() {
        return (

            <View style={styles.main}>
                <Text style={styles.header}>On Track</Text>
                <Text style={[styles.text, {marginRight:5, marginLeft: 5}]}>Current: {parseFloat(this.state.speed).toFixed(2)} mph</Text>


                <View>
                    <Text style={styles.text}>Average: { this.state.speedCounter !== 0 ? parseFloat(this.state.averageSpeed.toFixed(2)) : parseFloat(0.00).toFixed(2)} mph</Text>

                    <Text style={[styles.text, {marginTop:75, marginBottom: 10}]}>Goal: { this.state.goal !== 0 ? parseFloat(this.state.goal).toFixed(1): parseFloat(0).toFixed(1)} mph</Text>
                    <View style={{flexDirection:'row', marginBottom:10, justifyContent: 'center',
                        alignItems: 'center',}}>
                        <TouchableHighlight underlayColor="#878787" style={[styles.button, styles.leftButton]} onPress={this.onDecrease}>
                            <Text style={{fontSize:50, width:80, height:80, textAlign:'center'}}> - </Text>
                        </TouchableHighlight>

                        <TouchableHighlight underlayColor="#878787" style={styles.button} onPress={this.onIncrease}>
                            <Text style={{fontSize:50, width:80, height:80, textAlign:'center'}}> + </Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{marginTop:50, marginBottom:15}}>
                        <TouchableHighlight underlayColor="darkgreen" style={[styles.button, {width:300}]} onPress={this.onStart}>
                            <Text> Start </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginBottom:15}}>
                        <TouchableHighlight underlayColor="red" style={styles.button} onPress={this.onStop}>
                            <Text> Stop </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight underlayColor="#878787" style={styles.button} onPress={this.onReset}>
                            <Text> Reset </Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        );
    }
}



export default Geolocation;
