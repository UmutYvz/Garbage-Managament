import React from 'react';
import { Alert } from 'react-native';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';

const DriverEdit = (props) => {

    const { state } = props.navigation;


    const info = props.route.params.info

    const newInfo = {
        id: info.id,
        fullName: info.fullname,
        address_d: info.address_d,
        phone: info.phone,
        email: info.email,
        tcno: info.tcno,
        birthday: info.birthday,
        birthplace: info.birthplace,
        startDay: info.startday,
        emergencyPhone: info.emergencyphone,
        emergencyContact: info.emergencycontact,
        emergencyContactRelation: info.emergencycontactrelation,
    };

    const updateRec = () => {
        console.log(newInfo);
        fetch('http://192.168.1.4/backend/update_driver.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: newInfo.id,
                fullName: newInfo.fullName,
                address_d: newInfo.address_d,
                phone: newInfo.phone,
                email: newInfo.email,
                tcno: newInfo.tcno,
                birthday: newInfo.birthday,
                birthplace: newInfo.birthplace,
                startDay: newInfo.startDay,
                emergencyPhone: newInfo.emergencyPhone,
                emergencyContact: newInfo.emergencyContact,
                emergencyContactRelation: newInfo.emergencyContactRelation,
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                console.log(responseJson);
                console.log(newInfo)
                Alert.alert("Kayıt güncellendi.")
            }).catch((error) => {
                console.error(error)
            }).done();

    }


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>SÜRÜCÜ DÜZENLE</Text>
                </View>
                <View style={styles.formRow}>

                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"ID: " + info.id.toString()}
                            placeholderTextColor="#003f5c"
                            editable={false}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"İsim: " + info.fullname}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.fullName = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"Telefon: " + info.phone}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.phone = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"E-mail: " + info.email}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.email = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"T.C. No: " + info.tcno}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.tcno = e}
                        />
                    </View>


                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"Doğum Günü:" + info.birthday}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.birthday = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"Doğum Yeri: " + info.birthplace}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.birthplace = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"İlk İş Günü: " + info.startday}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.startDay = e}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 12 }}>
                        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                        <View>
                            <Text style={{ color: '#003f5c', width: 250, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>ACİL İLETİŞİM BİLGİLERİ</Text>
                        </View>
                        <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"İsim: "+info.emergencycontact}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.emergencyContact = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"İlişki: "+info.emergencycontactrelation}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.emergencyContactRelation = e}
                        />
                    </View>
                    <View style={styles.inputView} >
                        <TextInput
                            style={styles.inputText}
                            placeholder={"Telefon: "+info.emergencyphone}
                            placeholderTextColor="#003f5c"
                            onChangeText={(e) => newInfo.emergencyPhone = e}
                        />
                    </View>

                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
                    <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
                    <View>
                        <Text style={{ color: '#003f5c', width: 150, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>SÜRÜKLE VE KONUM SEÇ</Text>
                    </View>
                    <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
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

    formRow: {
        flexDirection: 'column',
        marginLeft: 25,
        marginRight: 20
    },

    inputView: {
        width: '100%',
        maxWidth: '100%',
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

export default DriverEdit;