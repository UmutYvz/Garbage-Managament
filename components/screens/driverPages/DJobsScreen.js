import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MapViewDirections from 'react-native-maps-directions';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.015;
const LONGITUDE_DELTA = 0.015;
const GOOGLE_MAPS_APIKEY = '';

export default class DJobsScreen extends React.Component {
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
      user_id: 0
    };


    this.mapView = null;
  }

  componentDidMount() {
    //console.log(this.props.route.params.info)
    this.getParams();
    //this.interval = setInterval(this.getParams, 30000);
  }

  componentWillUnmount() {
    //clearInterval(this.interval);
  }

  getParams = () => {
    //console.log("sdfsdfd",this.props.route.params.info)
    axios.post('http://192.168.1.2/backend/get_driver_route.php', {
      id: this.props.route.params.info.id,
    }).then(res => {
      //console.log(res.data)
      const reports = res.data;
      this.setState({ reports });
      this.setState({
        longitude: reports[1].lon,
        latitude: reports[1].lat
      })
      //console.log(reports[1]);

      const copyDestionation = { ...this.state.destination }
      copyDestionation.latitude = reports[reports.length - 1].lat
      copyDestionation.longitude = reports[reports.length - 1].lon
      this.setState({ destination: copyDestionation })

      const copyOrigin = { ...this.state.destination }
      copyOrigin.latitude = reports[0].lat
      copyOrigin.longitude = reports[0].lon
      this.setState({ origin: copyOrigin })

      let coords = []
      reports.map(report =>
        coords.push({ latitude: report.lat, longitude: report.lon })
      )
      //console.log(coords)
      this.setState({ coordinates: coords })
      //console.log(this.state.coordinates)

      console.log("Yeniden geldi.")

    })
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

  /**/


  render() {

    return (
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
    );
  }
}

module.exports = DJobsScreen;


/* */

const styles = StyleSheet.create({
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


