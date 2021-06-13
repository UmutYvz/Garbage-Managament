import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRedoAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons'


export default class mapScreen extends React.Component {

  constructor(props) {
    super(props);

    this.goToMarkerDetail = this.goToMarkerDetail.bind(this);
  }




  state = { reports: [] };

  componentDidMount() {
    //fetch('https://my-json-server.typicode.com/UmutYvz/JSONHOLDER/report')
    fetch('http://192.168.1.2/backend/get_markers.php')
      .then(res => res.json())
      .then(data => {
        //console.log(data)
        this.setState({ reports: data })
      })
      .catch(console.error)
  }

  componentWillUnmount(){
    console.log("Map Screen'den çıkılıyor.")
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

  render() {
    return (
      <View style={styles.mcontainer}>
        <MapView
          style={{ ...StyleSheet.absoluteFillObject }}
          initialRegion={{
            latitude: 41.249374,
            longitude: 32.682974,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015
          }} >

          {this.state.reports.map(report =>
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
          )}
        </MapView>
        <TouchableHighlight style={styles.rightB} onPress={() => { this.componentDidMount(); }}>
          <View style={styles.rtouchable}>
            <FontAwesomeIcon icon={faRedoAlt} color='white' size={30} />
          </View>
        </TouchableHighlight>

        <TouchableOpacity style={styles.leftB}
          onPress={() => { this.props.navigation.goBack(null) }}
        >
          <View style={styles.ltouchable}>
            <FontAwesomeIcon icon={faAngleLeft} color='white' size={40} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
module.exports = mapScreen;

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