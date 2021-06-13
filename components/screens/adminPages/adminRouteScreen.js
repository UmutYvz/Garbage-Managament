import { StyleSheet, TouchableHighlight, Text, View, BackHandler, Dimensions, Image } from 'react-native';
import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import { DrawerActions } from '@react-navigation/native';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.015;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBNfYXMG33WjbwfkHSMgTJgYwYuF5tSqRA';

export default class routeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reports: [],
            coordinates: [],

            origin: { latitude: 0, longitude: 0 },
            destination: { latitude: 0, longitude: 0 },
            waypoints: { latitude: 0, longitude: 0 },
            longitude: 0,
            latitude: 0,
            user_id: 0,
            timeout: 0, isLoaded: false,
            count: 0,
        };

        this.goToMarkerDetail = this.goToMarkerDetail.bind(this);
        this.mapView = null;
    }

    backAction = () => {
        this.props.navigation.goBack()
        return true;
    };

    componentDidMount() {

        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );


        this.state.timeout = setInterval(() => {
            this.currentMarker();
        }, 3000)


        this.getParams();
        this.interval = setInterval(this.getParams, 30000);
    }

    componentWillUnmount() {

        console.log("Unmonting... clearing interval");
        clearInterval(this.interval);
    }

    

    getParams = () => {
        this.state.user_id = this.props.route.params.item.id;
        console.log("Değişen id:", this.state.user_id)
        axios.post('http://192.168.1.2/backend/get_driver_route.php', {
            id: this.state.user_id,
        }).then(res => {

            const reports = res.data;
            this.setState({ reports });
            this.setState({
                longitude: reports[1].lon,
                latitude: reports[1].lat
            })
            // console.log(reports[1]);

            const copyDestionation = { ...this.state.destination }
            copyDestionation.latitude = reports[reports.length - 1].lat
            copyDestionation.longitude = reports[reports.length - 1].lon
            this.setState({ destination: copyDestionation })

            const copyOrigin = { ...this.state.destination }
            copyOrigin.latitude = reports[0].lat
            copyOrigin.longitude = reports[0].lon
            this.setState({ origin: copyOrigin })
            this.setState({ isLoaded: true })

            let coords = []
            reports.map(report =>
                coords.push({ latitude: report.lat, longitude: report.lon })
            )
            //console.log(coords)
            this.setState({ coordinates: coords })
            console.log(coords)
            console.log("Veriler değişti.")
        })
    }

    goToMarkerDetail(id) {
        this.state.reports.forEach(rapor => {
            if (rapor.id == id) {
                this.props.navigation.navigate('MarkerDetail', {
                    id: rapor.id,
                    adress: rapor.address_m,
                    street: rapor.street,
                    district: rapor.district,
                    city: rapor.city,
                    country: rapor.country,
                    info: rapor.info,
                    lon: rapor.lon,
                    lat: rapor.lat,
                })
            } else {
                console.log("bulunamadı")
            }
        });
    }

    renderMarkers = () => {

        return (
            this.state.reports.map(report =>
                <MapView.Marker
                    key={report.id}
                    coordinate={{
                        latitude: parseFloat(report.lat),
                        longitude: parseFloat(report.lon)
                    }}
                    title={report.info}
                    description={report.street}

                >
                    <MapView.Callout tooltip onPress={() => this.goToMarkerDetail(parseInt(report.id))} >
                        <TouchableHighlight style={styles.container}>
                            <View>
                                <Text style={styles.upperText}>{report.info}</Text>
                                <Text style={styles.lowerText}>{report.city}, {report.district}, {report.street}, {report.adress}</Text>
                            </View>
                        </TouchableHighlight>
                    </MapView.Callout>

                </MapView.Marker>
            )
        )
    }

    renderDirection = () => {
        return (
            (this.state.coordinates.length >= 2) && (
                <MapViewDirections
                    origin={this.state.origin}
                    waypoints={(this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1) : null}
                    destination={this.state.destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    optimizeWaypoints={true}
                    onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                    }}
                    onReady={result => {

                        console.log(`Distance: ${result.distance} km`);
                        console.log(`Duration: ${result.duration} min.`);

                        this.mapView.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                                right: (width / 20),
                                bottom: (height / 20),
                                left: (width / 20),
                                top: (height / 20),
                            }
                        });
                    }}
                    onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                    }}
                />
            ))
    }



    onMapPress = (e) => {
        this.setState({
            coordinates: [
                ...this.state.coordinates,
                e.nativeEvent.coordinate,
            ],
        });
    }

    currentMarker = () => {
        const bins = this.state.reports;
        const testLoc = this.state.origin;
        bins.map(bin => {
            if (bin.lat < (testLoc.latitude + 0.00005) && bin.lat > (testLoc.latitude - 0.00005)) {
                axios.post('http://192.168.1.2/backend/feedback.php', {
                    id: bin.id
                }).then(
                    console.log("Başarıyla silindi")
                ).catch(console.error);
                const index = bins.findIndex(item => item.id === bin.id)
                bins.splice(index, 1)
            }
        })
        return (
            <MapView.Marker
                key={0}
                coordinate={{
                    latitude: parseFloat(this.state.origin.latitude),
                    longitude: parseFloat(this.state.origin.longitude)
                }}
                title={"Şuan buradasınız."}
            >
                <FontAwesomeIcon icon={faMapMarker} color='#4285F4' size={32} />
            </MapView.Marker>
        )
    }

    render() {

        return (
            this.state.isLoaded ?
                (<View style={{ flex: 1 }}>

                    <MapView

                        initialRegion={{
                            latitude: parseFloat(this.state.latitude),
                            longitude: parseFloat(this.state.longitude),
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                        style={StyleSheet.absoluteFill}
                        ref={c => this.mapView = c}
                        onPress={this.onMapPress}
                    >
                        {this.renderMarkers()}
                        {this.renderDirection()}


                    </MapView>


                </View>) :
                (<View >
                    <View style={styles.loading}>
                        <Image
                            source={require('../../shared/loading.gif')}
                        />
                    </View>
                </View>)


        );
    }
}

module.exports = routeScreen;


/* */

const styles = StyleSheet.create({
    loading: {
        alignItems: 'center',
        marginTop: '50%'
    },
    mcontainer: {
        flex: 1,
        //backgroundColor: '#caf0e9',
        backgroundColor: 'white',

    },
    container: {
        borderColor: 'black',
        width: 170,
        textAlign: 'center',
        borderRadius: 20,
        backgroundColor: '#c9c9c9',

    },
    upperText: {
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 10
    },
    lowerText: {
        width: 165,
        textAlign: 'center', marginBottom: 10
    },
    rightB: {
        width: 50,
        height: 50,
        backgroundColor: '#d01919',
        borderRadius: 100,
        position: 'absolute',
        top: 35,
        right: 15,
        borderRadius: 100
    },
    rtouchable: {
        marginTop: 9,
        marginLeft: 10,

    }, leftB: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        borderRadius: 100,
        position: 'absolute',
        top: 35,
        left: 15,
        borderRadius: 100
    },
    ltouchable: {
        marginTop: 5,
        marginLeft: 4,

    }
});


