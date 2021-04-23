import { StyleSheet, TouchableHighlight, Text, View, BackHandler, Dimensions, Alert, Button, Platform } from 'react-native';
import React, { Component } from 'react';
import { Constants } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'

export default class example extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Location: null,
            errorMessage: null,
            isLoading: false
        };
    }

    componentDidMount() {

        //this._getLocationAsync();
        this._getLocationAsync(this.secondFunction);

    }

    getParams = () => {
        console.log("getparams")
    }

    _getLocationAsync = async (_callback) => {
        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.state({
                    errorMessage: 'İzin reddedildi'
                });
            }


            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            this.setState({ location });
            this.setState({ isLoading: true })
            console.log("Getting new location-->", this.state.location.coords.longitude, this.state.location.coords.latitude)
        } catch (error) {
            console.log(error)
        }
        _callback();
    }

    secondFunction = () => {
        // call first function and pass in a callback function which
        // first function runs when it has completed

        console.log("Konum aldı")
    }

    render() {

        let text = JSON.stringify(this.state.location);


        return (
            this.state.isLoading ?
                (<View style={{ flex: 1 }}>
                    <View style={{ marginTop: 50 }}>


                        <Text> {text}</Text>

                    </View>
                </View>) :
                (<View style={{ flex: 1 }}>
                    <View style={{ marginTop: 50 }}>


                        <Text> loading...</Text>

                    </View>
                </View>)


        );
    }
}

module.exports = example;


const styles = StyleSheet.create({

});


