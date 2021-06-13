import { StyleSheet, TouchableHighlight, Text, View, BackHandler, Dimensions, Alert, Image } from 'react-native';
import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMapMarker, faCheck } from '@fortawesome/free-solid-svg-icons';
import { text } from '@fortawesome/fontawesome-svg-core';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getPathLength, getDistance } from 'geolib';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.015;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBNfYXMG33WjbwfkHSMgTJgYwYuF5tSqRA';

const initialState = []

export default class DJobsScreen extends React.Component {




  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      coordinates: [],
      origin: { latitude: 0, longitude: 0 },
      destination: { latitude: '0', longitude: '0' },
      waypoints: { latitude: 0, longitude: 0 },
      longitude: 0,
      latitude: 0,
      user_id: this.props.route.params.info.id,
      timeout: 0,
      isLoaded: false,
      count: 0,
      deleted: false,
      livePos: false,
      gidilenYollar: { latitude: 0, longitude: 0 },
      distance: [],
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
    try {
      this._getLocationAsync();
    } catch (error) {
      console.log(error)
    }

    this.state.timeout = setInterval(() => {
      this.currentMarker();
      this._getLocationAsync();
    }, 3000)
    this.getParams();
    this.interval = setInterval(this.getParams, 30000);

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  _getLocationAsync = async () => {

    try {

      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.state({
          errorMessage: 'İzin reddedildi'
        });
      }

      let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      this.setState({ location });
      const copyOrigin = { ...this.state.destination }
      copyOrigin.latitude = location.coords.latitude
      copyOrigin.longitude = location.coords.longitude
      this.setState({ origin: copyOrigin })
      this.setState({ isLoaded: true })

    } catch (error) {
      console.log(error)
    }
  }


  setDistance = (distanceCoords) => {

    const lenght = getPathLength(distanceCoords)
    console.log("mesafe:", lenght, "metre");

    axios.post('http://192.168.1.2/backend/traveled_distance.php', {
      id: this.state.user_id,
      lenght: lenght
    }).then(res => {
      console.log("burda")
      this.setState({ distance: initialState })
    }).catch(console.error);
    console.log("yeni state durumu  = ", this.state.distance)

  }





  getParams = () => {

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




      let coords = []
      reports.map(report =>
        coords.push({ latitude: report.lat, longitude: report.lon })
      )
      //console.log(coords)
      this.setState({ coordinates: coords })

      let waypoints = this.state.coordinates

      //console.log(waypoints)
      //waypoints.shift()
      waypoints.pop()
      //console.log("yeniler:", waypoints)
      this.setState({ waypoints: waypoints })

      console.log('Güncel...');
      this.setState({ count: this.state.count + 1 })
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
          alertPresent: false
        })
      } else {
        console.log("bulunamadı")
      }
    });
  }

  renderMarkers = () => {

    return ((
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
          <MapView.Callout tooltip >
            <TouchableHighlight style={styles.container}>
              <View>
                <Text style={styles.upperText}>{report.info}</Text>
                <Text style={styles.lowerText}>{report.city}, {report.district}, {report.street}, {report.adress}</Text>
              </View>
            </TouchableHighlight>
          </MapView.Callout>

        </MapView.Marker>)
    )
    )
  }

  renderDirection = () => {
    return (
      (this.state.coordinates.length >= 2) && (
        <MapViewDirections
          origin={this.state.origin}
          waypoints={(this.state.waypoints.length > 0) ? (this.state.waypoints) : (null)}
          destination={this.state.destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#ADC3FF"
          optimizeWaypoints={true}
          onStart={(params) => {

            let latlon = params.origin
            let splitlatlon = latlon.split(',')

            let coords = [{ latitude: 0, longitude: 0 }]
            coords.latitude = splitlatlon[0];
            coords.longitude = splitlatlon[1];
            this.state.distance.push({ latitude: splitlatlon[0], longitude: splitlatlon[1] });

            this.state.distance.length > 1 ? this.setDistance(this.state.distance) : console.log("koordinatlar yetersiz")

            //console.log("origins -> ", this.state.distance)
            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            //console.log(params.waypoints)
          }}
          onReady={result => {

            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
            // //console.log("coordinatlar", result.coordinates);
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
            console.log(errorMessage)
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
      </MapView.Marker >
    )
  }

  test = () => {

    const bins = this.state.reports;
    let notIn = true
    const testLoc = this.state.origin;
    bins.map(bin => {
      if (bin.lat < (testLoc.latitude + 0.0001) && bin.lat > (testLoc.latitude - 0.0001) && bin.lon < (testLoc.longitude + 0.0001) && bin.lon > (testLoc.longitude - 0.0001)) {
        Alert.alert(
          "Çöp kutusu boşaltıldı mı?",
          "İşlem tamamlandıysa 'Evet' butonuna dokunun.",
          [
            {
              text: "Hayır",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            {
              text: "Evet", onPress: () => {

                axios.post('http://192.168.1.2/backend/feedback.php', {
                  id: bin.id
                }).then(
                  console.log("Başarıyla silindi")
                ).catch(console.error);
                const index = bins.findIndex(item => item.id === bin.id)
                bins.splice(index, 1)

                axios.post('http://192.168.1.2/backend/driverpoint.php', {
                  id: this.state.user_id
                }).then(
                  console.log("puan eklendi")
                ).catch(console.error);


              }
            }
          ]
        );
      }

    })


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
            {this.currentMarker()}
            {this.renderMarkers()}
            {this.renderDirection()}

          </MapView>


          <View style={{
            width: 180,
            height: 60,
            backgroundColor: '#003f5c',
            borderRadius: 100,
            position: 'absolute',
            bottom: 30,
            right: 20,
            borderRadius: 100,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,

          }}>
            <TouchableOpacity onPress={() => { this.test() }} style={{ flexDirection: 'row' }} >
              <Text style={{ marginRight: 3, color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} >Bildirim {"\n"} Yap</Text>
              <FontAwesomeIcon style={{ marginTop: 5 }} icon={faCheck} color='white' size={40} />
            </TouchableOpacity>
          </View>
        </View >) :
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

module.exports = DJobsScreen;


/* */

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    marginTop: '50%'
  },
  button: {
    position: 'relative',
    top: 700
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


