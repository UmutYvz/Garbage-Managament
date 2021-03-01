import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEdit, faTrashAlt, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

const driverDetailComponent = (props) => {

  const { state } = props.navigation;
  const info = props.route.params.item

  const deleteData = (id) => {
    console.log(info.markerData);
    fetch('http://192.168.1.4/backend/delete_driver.php', {
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
        Alert.alert("Kayıt Silindi.")
      }).catch((error) => {
        console.error(error)
      }).done();

  }


  function goBack() {
    props.navigation.goBack(null)
  }




  return (


    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SÜRÜCÜ DETAY</Text>
        <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
          onPress={() => { props.navigation.goBack(null) }}
        >
          <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
        </TouchableOpacity>
      </View>


      <SafeAreaView style={styles.infoContainer}>
        <ScrollView>
          <View style={styles.headerDetail}>
            <Image
              source={{ uri: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/1_avatar-512.png' }}
              style={styles.image}
            />
            <View style={styles.detail}>
              <View style={styles.headerLower}>
                <Text style={{
                  color: 'black',
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginLeft: 8,
                  marginTop: 7
                }}> {info.fullname}</Text>
              </View>

              <View style={styles.headerLowerLower}>
                <Text style={styles.infoLowerParam}>Garbage Management</Text>
                <Text style={styles.infoLowerParam}>Driver</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 12 }}>
            <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
            <View>
            </View>
            <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
          </View>


          <ScrollView style={{ flexDirection: 'column', marginTop: 0 }}>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}>Telefon: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.phone}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}>E-mail: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.email}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}>T.C. No: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.tcno}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}>Doğum Günü: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.birthday}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}>Doğum Yer: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.birthplace}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}>İlk İş Günü: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.startday}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12, marginBottom: 12 }}>
              <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
              <View>
                <Text style={{ color: '#003f5c', width: 250, textAlign: 'center', fontWeight: 'bold', letterSpacing: 1, fontSize: 18 }}>ACİL İLETİŞİM BİLGİLERİ</Text>
              </View>
              <View style={{ flex: 0.5, height: 1, backgroundColor: '#003f5c' }} />
            </View>

            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}> Telefon: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.emergencyphone}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}> İsim: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.emergencycontact}</Text>
              </View>
            </View>
            <View style={styles.infoItem}>
              <View style={styles.infoLeft}>
                <Text style={styles.infoText}> İlişki: </Text>
              </View>
              <View style={styles.infoRight}>
                <Text style={styles.infoParam}>{info.emergencycontactrelation}</Text>
              </View>
            </View>

          </ScrollView>




        </ScrollView>
      </SafeAreaView>


      <View style={styles.buttons}>
        <TouchableHighlight style={styles.leftB} onPress={() => props.navigation.navigate('DriverEdit', { info })}>
          <View style={styles.ltouchable}>
            <FontAwesomeIcon icon={faEdit} color='white' size={30} />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.rightB} onPress={() => { deleteData(info.id) }}>
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
  button: {
    width: 100
  },
  detail: {
    flexDirection: 'column'
  },
  headerDetail: {
    marginTop: 25,
    marginLeft: 20,
    flexDirection: 'row'
  },
  headerLower: {

    marginLeft: 0,
    marginTop: 3
  },
  headerLowerLower: {
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: 7
  },
  image: {
    width: 100,
    height: 100
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    height: 450,
  },
  infoParam: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold'
  },
  infoText: {
    fontSize: 18,
    color: '#003f5c',
    fontWeight: 'normal',
    flex: 0.3,
  },
  infoLowerParam: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'normal',

    marginLeft: 8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  infoLeft: {
    flex: 0.45,
    alignItems: 'flex-end',
    textAlign: 'center',
  },
  infoRight: {
    flex: 0.55,
    alignItems: 'flex-start',
    textAlign: 'center'

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

export default driverDetailComponent;