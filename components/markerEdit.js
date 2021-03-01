import React from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const MarkerEdit = (props) => {

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
            latitude: props.route.params.latitude,
            longitude: props.route.params.longitude,
        },
        mapData: {
            latitude: props.route.params.latitude,
            longitude: props.route.params.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        },
    };

    const newInfo = {
        id: info.markerData.id,
        address_m: info.markerData.adress,
        street: info.markerData.street,
        district: info.markerData.district,
        city: info.markerData.city,
        country: info.markerData.country,
        info: info.markerData.info,
        lat: info.markerData.latitude,
        lon: info.markerData.longitude,
    };

    const updateRec = () => {
        console.log(newInfo);
        fetch('http://192.168.1.4/backend/update.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: newInfo.id,
                address_m: newInfo.address_m,
                street: newInfo.street,
                district: newInfo.district,
                city: newInfo.city,
                country: newInfo.country,
                info: newInfo.info,
                lon: newInfo.lon,
                lat: newInfo.lat,
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
                Alert.alert("Kayıt güncellendi.")
            }).catch((error) => {
                console.error(error)
            }).done();

    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>KONTEYNER DETAY</Text>
                    <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
                        onPress={() => { props.navigation.goBack(null) }}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
                    </TouchableOpacity>
                </View>
                <View style={styles.formRow}>
                    <View style={styles.formColumn}>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.id.toString()}
                                placeholderTextColor="#003f5c"
                                editable={false}
                            />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.city}
                                placeholderTextColor="#003f5c"
                                onChangeText={(e) => newInfo.city = e}
                            />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.street}
                                placeholderTextColor="#003f5c"
                                onChangeText={(e) => newInfo.street = e}
                            />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.country}
                                placeholderTextColor="#003f5c"
                                onChangeText={(e) => newInfo.country = e}
                            />
                        </View>
                    </View>
                    <View style={styles.formColumn}>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.info}
                                placeholderTextColor="#003f5c"
                                onChangeText={(e) => newInfo.info = e}
                            />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.district}
                                placeholderTextColor="#003f5c"
                                onChangeText={(e) => newInfo.district = e}
                            />
                        </View>
                        <View style={styles.inputView} >
                            <TextInput
                                style={styles.inputText}
                                placeholder={info.markerData.adress}
                                placeholderTextColor="#003f5c"
                                onChangeText={(e) => newInfo.address_m = e}
                            />
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                    <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                    <View>
                        <Text style={{ color: '#003f5c', width: 150, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>SÜRÜKLE VE KONUM SEÇ</Text>
                    </View>
                    <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                </View>
                <View style={styles.mapContainer}>
                    <View style={styles.mapView}>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: parseFloat(info.markerData.latitude),
                                longitude: parseFloat(info.markerData.longitude),
                                latitudeDelta: 0.015,
                                longitudeDelta: 0.015
                            }}
                        >
                            <MapView.Marker
                                key={props.route.params.id}
                                draggable
                                coordinate={{
                                    latitude: parseFloat(info.markerData.latitude),
                                    longitude: parseFloat(info.markerData.longitude)
                                }}
                                title={info.markerData.location}
                                description={info.markerData.comments}
                                onDragEnd={(e) => {
                                    newInfo.lat = e.nativeEvent.coordinate.latitude;
                                    newInfo.lon = e.nativeEvent.coordinate.longitude;
                                    console.log("New" + info.markerData.latitude + "...." + info.markerData.longitude)
                                }
                                }
                            >
                            </MapView.Marker>
                        </MapView>
                    </View>
                </View>

            </ScrollView>
            <TouchableOpacity activeOpacity={0.8} style={styles.Btn} onPress={() => updateRec()}>
                <Text style={styles.btnText}>GÜNCELLE</Text>
            </TouchableOpacity>
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
    formRow: {
        flexDirection: 'row'
    },
    formColumn: {
        flexDirection: 'column',
        marginLeft: 25,
        marginRight: 20
    },
    inputView: {
        width: 150,
        maxWidth: 150,
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 7,
        paddingBottom: 7
    },
    inputText: {
        textAlign: 'center',
    },
    Btn:
    {
        width: '100%',
        position: 'absolute',
        backgroundColor: '#003f5c',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 0,
        bottom: 0

    },

    btnText:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },
});

export default MarkerEdit;