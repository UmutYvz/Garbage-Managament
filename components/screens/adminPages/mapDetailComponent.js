import React, {useEffect} from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrashAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const mapDetailComponent = (props) => {



  const { state } = props.navigation;
  const info = {
    markerData: {
      id: props.route.params.id,
      adress: props.route.params.adress,
      street: props.route.params.street,
      district: props.route.params.district,
      city: props.route.params.city,
      country: props.route.params.country,
      info: props.route.params.info,
      latitude: props.route.params.lat,
      longitude: props.route.params.lon,
    },
    mapData: {
      latitude: props.route.params.lat,
      longitude: props.route.params.lon,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  };

  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
      console.log("Marker detaydan çıkılıyor.")
    }
  })

  const deleteData = (id) => {
    console.log(info.markerData);
    fetch('http://192.168.1.2/backend/delete_marker.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
      })
    }).then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
      }).catch((error) => {
        console.error(error)
      }).done();

  }




  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>KONTEYNER DETAY</Text>
        <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
          onPress={() => { props.navigation.goBack(null) }}
        >
          <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapView}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: parseFloat(info.mapData.latitude),
              longitude: parseFloat(info.mapData.longitude),
              latitudeDelta: 0.0015,
              longitudeDelta: 0.0015
            }}
          >
            <MapView.Marker
              key={props.route.params.id}
              coordinate={{
                latitude: parseFloat(info.markerData.latitude),
                longitude: parseFloat(info.markerData.longitude)
              }}
              title={info.markerData.location}
              description={info.markerData.comments}
              onDragEnd={(e) => {
                console.log("New" + e.nativeEvent.coordinate.latitude + "...." + e.nativeEvent.coordinate.longitude)
              }
              }
            >
            </MapView.Marker>
          </MapView>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
        <View>
          <Text style={{ color: '#003f5c', width: 100, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>DETAYLAR</Text>
        </View>
        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
      </View>

      <SafeAreaView style={styles.infoContainer}>
        <ScrollView>

          <View style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>Konteyner ID: </Text>
            </View>
            <View style={styles.infoRiht}>
              <Text style={styles.infoParam}>{info.markerData.id}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>Şehir: </Text>
            </View>
            <View style={styles.infoRiht}>
              <Text style={styles.infoParam}>{info.markerData.city}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>İlçe: </Text>
            </View>
            <View style={styles.infoRiht}>
              <Text style={styles.infoParam}>{info.markerData.district}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>Mahalle: </Text>
            </View>
            <View style={styles.infoRiht}>
              <Text style={styles.infoParam}>{info.markerData.street}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>Adres: </Text>
            </View>
            <View style={styles.infoRiht}>
              <Text style={styles.infoParam}>{info.markerData.adress}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoLeft}>
              <Text style={styles.infoText}>Bilgiler: </Text>
            </View>
            <View style={styles.infoRiht}>
              <Text style={styles.infoParam}>{info.markerData.info}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>


      <View style={styles.buttons}>
        <TouchableHighlight style={styles.leftB} onPress={() => props.navigation.navigate('MarkerEdit', {
          id: info.markerData.id,
          adress: info.markerData.adress,
          street: info.markerData.street,
          district: info.markerData.district,
          city: info.markerData.city,
          country: info.markerData.country,
          info: info.markerData.info,
          latitude: info.markerData.latitude,
          longitude: info.markerData.longitude,
        })}>
          <View style={styles.ltouchable}>
            <FontAwesomeIcon icon={faEdit} color='white' size={30} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.rightB} onPress={() => { deleteData(info.markerData.id) }}>
          <View style={styles.rtouchable}>
            <FontAwesomeIcon icon={faTrashAlt} color='white' size={30} />
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#caf0e9',
    backgroundColor: 'white',

  },
  header: {
    marginTop: 35,
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003f5c'
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
    color: '#E1ECF5'
  },
  mapContainer: {
    alignItems: 'center',
  },
  mapView: {

    height: 355,
    width: 355,
    borderWidth: 5,
    borderColor: '#E1ECF5',
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden'

  },
  map: {
    height: 350,
    borderRadius: 50,
  },
  button: {
    width: 100
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 450,
  },
  infoItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  infoLeft: {
    flex: 0.4,
    alignItems: 'flex-end'
  },
  infoRiht: {
    flex: 0.6,
    alignItems: 'flex-start',
    textAlign: 'center'

  },
  infoText: {
    fontSize: 18,
    color: '#003f5c',
    fontWeight: 'bold',
    flex: 0.3,
  },
  infoParam: {
    color: '#003f5c',
    fontSize: 18,
    flex: 0.7
  },

  rightB: {
    width: 50,
    height: 50,
    backgroundColor: '#d01919',
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    right: 15,
    borderRadius: 100
  },
  leftB: {
    width: 50,
    height: 50,
    backgroundColor: '#21ba45',
    borderRadius: 100,
    position: 'absolute',
    bottom: 15,
    left: 15

  },
  ltouchable: {
    marginTop: 9,
    marginLeft: 14
  },
  rtouchable: {
    marginTop: 9,
    marginLeft: 10
  }

});

export default mapDetailComponent;