import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { Keyboard } from 'react-native'
import { Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'



export default class AAddBinScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            address_m: '',
            street: '',
            district: '',
            city: '',
            country: '',
            info: '',
            lat: '',
            lon: '',
        }
        this.goMap = this.goMap.bind();

    }

    pressAdd() {

        const check = this.saveData();
        if (check == true) {
            Alert.alert("Kayıt başarıyla eklendi.")
            this.props.navigation.goBack(null)
        } else {
            Alert.alert("Kayıt eklenemedi. Alanları doldurunuz.")
        }
    }

    goMap() {
        this.props.navigation.navigate('Map');
    }

    saveData = () => {

        console.log(this.state.address_m);
        if (this.state.address_m && this.state.street && this.state.district && this.state.city && this.state.country && this.state.info && this.state.lat && this.state.lon) {
            fetch('http://192.168.1.2/backend/add_marker.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    address_m: this.state.address_m,
                    street: this.state.street,
                    district: this.state.district,
                    city: this.state.city,
                    country: this.state.country,
                    info: this.state.info,
                    lon: this.state.lon,
                    lat: this.state.lat,
                })
            }).then((response) => response.text())
                .then((responseJson) => {
                    console.log(responseJson);
                }).catch((error) => {
                    console.error(error)
                }).done();
            return true;
        } else {
            Alert.alert("Lütfen alanları eksiksiz doldurunuz.");
            return false;
        }




    }


    render() {
        return (
            <SafeAreaView style={styles.container} onPress={() => Keyboard.dismiss()}>
                <ScrollView>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>KONTEYNER EKLE</Text>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
                            onPress={() => { this.props.navigation.goBack(null) }}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoContainer} >

                        <View style={styles.container}>

                            <TextInput underlineColorAndroid="transparent" placeholder="Address Here" style={styles.textInput} onChangeText={(text) => this.setState({ address_m: text })} />

                            <TextInput underlineColorAndroid="transparent" placeholder="Street Here" style={styles.textInput} onChangeText={(text) => this.setState({ street: text })} />

                            <TextInput underlineColorAndroid="transparent" placeholder="District Here" style={styles.textInput} onChangeText={(text) => this.setState({ district: text })} />

                            <TextInput underlineColorAndroid="transparent" placeholder="City Here" style={styles.textInput} onChangeText={(text) => this.setState({ city: text })} />

                            <TextInput underlineColorAndroid="transparent" placeholder="Country Here" style={styles.textInput} onChangeText={(text) => this.setState({ country: text })} />

                            <TextInput underlineColorAndroid="transparent" placeholder="Info Here" style={styles.textInput} onChangeText={(text) => this.setState({ info: text })} />

                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -140 }}>
                        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                        <View>
                            <Text style={{ color: '#003f5c', width: 100, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>KONUM SEÇİN</Text>
                        </View>
                        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                    </View>

                    <View style={styles.mapContainer}>
                        <View style={styles.mapView}>

                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: 41.249374,
                                    longitude: 32.682974,
                                    latitudeDelta: 0.015,
                                    longitudeDelta: 0.015
                                }}
                            >
                                <MapView.Marker
                                    key='1'
                                    draggable
                                    coordinate={{
                                        latitude: 41.249374,
                                        longitude: 32.682974,
                                    }}
                                    onDragEnd={(e) => {
                                        this.state.lat = e.nativeEvent.coordinate.latitude;
                                        this.state.lon = e.nativeEvent.coordinate.longitude;
                                        console.log("New" + this.state.lat + "...." + this.state.lon)
                                    }
                                    }
                                >
                                </MapView.Marker>
                            </MapView>

                        </View>
                    </View>


                </ScrollView>
                <TouchableOpacity disabled={this.state.disabled} activeOpacity={0.8} style={styles.Btn} onPress={() => this.pressAdd()}>
                    <Text style={styles.btnText}>EKLE</Text>
                </TouchableOpacity>
            </SafeAreaView>

        );
    }
}
module.exports = AAddBinScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#caf0e9',
        backgroundColor: 'white',

    },
    containerT:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        paddingHorizontal: 25,
        paddingTop: (Platform.OS == 'ios') ? 20 : 0
    },

    textInput:
    {
        height: 40,
        borderWidth: 1,
        borderColor: '#003f5c',
        marginVertical: 5,
        alignSelf: 'stretch',
        padding: 8,
        fontSize: 16
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

    btnText:
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
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
        marginTop: 10,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        height: 450,
    },

});