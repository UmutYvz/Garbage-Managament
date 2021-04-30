import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Alert, Keyboard } from 'react-native';
import DatePicker from 'react-native-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default class AAddDriverScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            fullName: '',
            address_d: '',
            phone: '',
            email: '',
            tcno: '',
            birthday: '2021-01-01',
            startDay: '2021-01-01',
            emergencyPhone: '',
            emergencyContact: '',
            password: ''
        }

    }

    pressAdd() {

        const check = this.saveData();
        if (check == true) {
            Alert.alert("Kayıt başarıyla eklendi.")
            //setTimeout(this.goMap(), 800);
        } else {
            Alert.alert("Başarısız.")
        }

    }



    saveData = () => {

        console.log(this.state);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (this.state.fullName && this.state.address_d && this.state.phone && this.state.email && this.state.tcno && this.state.emergencyPhone && this.state.emergencyContact) {
            if (reg.test(this.state.email) === false) {
                alert("Email is Not Correct");
                this.setState({ email: 'Email is Not Correct' })
                return false;
            } else {

                fetch('http://192.168.1.2/backend/add_driver.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        fullName: this.state.fullName,
                        address_d: this.state.address_d,
                        phone: this.state.phone,
                        email: this.state.email,
                        tcno: this.state.tcno,
                        birthday: this.state.birthday,
                        startDay: this.state.startDay,
                        emergencyPhone: this.state.emergencyPhone,
                        emergencyContact: this.state.emergencyContact,
                        password: this.state.password
                    })
                }).then((response) => response.text())
                    .then((responseJson) => {
                        console.log(responseJson);
                        this.props.navigation.replace('DriverScreen')
                    }).catch((error) => {
                        console.error(error)
                    }).done();
                return true;
            }
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
                        <Text style={styles.headerText}>SÜRÜCÜ EKLE</Text>
                        <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
                            onPress={() => { this.props.navigation.goBack(null) }}
                        >
                            <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.infoContainer} >

                        <View style={styles.container}>

                            <TextInput underlineColorAndroid="transparent" placeholder="İsim ve Soyisim" style={styles.textInput} onChangeText={(text) => this.setState({ fullName: text })} />
                            <TextInput underlineColorAndroid="transparent" placeholder="Adres" style={styles.textInput} onChangeText={(text) => this.setState({ address_d: text })} />
                            <TextInput underlineColorAndroid="transparent" placeholder="Telefon Numarası" style={styles.textInput} onChangeText={(text) => this.setState({ phone: text })} />
                            <TextInput underlineColorAndroid="transparent" placeholder="E-mail Adresi" style={styles.textInput} onChangeText={(text) => this.setState({ email: text })} />
                            <TextInput underlineColorAndroid="transparent" placeholder="Şifre Belirleyiniz" style={styles.textInput} onChangeText={(text) => this.setState({ password: text })} />
                            <TextInput underlineColorAndroid="transparent" placeholder="T.C Kimlik Numarası" style={styles.textInput} onChangeText={(text) => this.setState({ tcno: text })} />
                            <DatePicker
                                style={{
                                    width: 373,
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#003f5c',
                                    marginVertical: 5,
                                    fontSize: 16
                                }}

                                mode="date"
                                showIcon={false}
                                format="YYYY-MM-DD"
                                minDate="1900-01-01"
                                maxDate="2022-12-12"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="Doğum Günü Seçiniz"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    placeholderText: {
                                        fontSize: 16,
                                        color: '#ababab',

                                    },
                                    placeholder: {

                                    }
                                }}
                                onDateChange={(date) => { this.setState({ birthday: date }) }}
                            />
                            <DatePicker
                                style={{
                                    width: 373,
                                    height: 40,
                                    borderWidth: 1,
                                    borderColor: '#003f5c',
                                    marginVertical: 5,
                                    fontSize: 16
                                }}

                                mode="date"
                                showIcon={false}
                                format="YYYY-MM-DD"
                                minDate="1900-01-01"
                                maxDate="2022-12-12"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                placeholder="İşe Giriş Tarih Seçiniz"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    placeholderText: {
                                        fontSize: 16,
                                        color: '#ababab',

                                    },
                                    placeholder: {

                                    }
                                }}
                                onDateChange={(date) => { this.setState({ startDay: date }) }}
                            />
                        </View>



                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c', }} />
                        <View>
                            <Text style={{ color: '#003f5c', width: 200, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>ACİL DURUM İLETİŞİM</Text>
                        </View>
                        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                    </View>

                    <View style={styles.infoContainer} >
                        <View style={styles.container}>

                            <TextInput underlineColorAndroid="transparent" placeholder="Acil Durum Telefon Numarası" style={styles.textInput} onChangeText={(text) => this.setState({ emergencyPhone: text })} />
                            <TextInput underlineColorAndroid="transparent" placeholder="Acil Durum Kişi İsim ve Soyisim" style={styles.textInputLast} onChangeText={(text) => this.setState({ emergencyContact: text })} />

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
module.exports = AAddDriverScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#caf0e9',
        backgroundColor: 'white',

    },
    infoContainer: {
        marginTop: 10,
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#003f5c',
        marginVertical: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 8,
        fontSize: 16,
    },
    textInputLast: {
        height: 40,
        borderWidth: 1,
        borderColor: '#003f5c',
        marginVertical: 5,
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 8,
        fontSize: 16,
        marginBottom: 60
    },
    Btn: {
        width: '100%',
        position: 'absolute',
        backgroundColor: '#003f5c',
        alignSelf: 'stretch',
        padding: 10,
        marginTop: 10,
        marginBottom: 0,
        bottom: 0

    },

    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    },

    btnText: {
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


});