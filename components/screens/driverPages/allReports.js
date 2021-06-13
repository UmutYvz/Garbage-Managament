import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, FlatList } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusCircle, faPhoneAlt, faCalendarCheck, faEnvelopeOpen, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import AwesomeAlert from 'react-native-awesome-alerts';

import axios from 'axios'



export default function allReports({ navigation }) {

  const [res, setRes] = useState();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getData();
    return () => {
      console.log("ayrıldık agam.")
    }
  }, [])


  const getData = async () => {
    const response = await axios.get('http://192.168.1.2/backend/get_report.php')
    setRes(response.data)
  }

  const _renderAdminReply = (props) => {

    const showAlert = () => {
      setAlert(true)
    };

    const hideAlert = () => {
      setAlert(false)
    };


    return (
      <View style={{
        flexDirection: 'row',
        marginLeft: 40
      }}>

        < FontAwesomeIcon icon={faCheckCircle} style={{
          color: '#00f950',
        }} />
        <TouchableOpacity onPress={() => showAlert()}>
          <Text style={{ color: '#28587D', marginLeft: 5 }}>Yanıtı görmek için buraya tıkla!</Text>
        </TouchableOpacity>

        <AwesomeAlert
          show={alert}
          showProgress={false}
          title="Adminin Cevabı:"
          message={props.data.admin_reply}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Anlaşıldı!"
          confirmButtonColor="#4CAF50"
          onConfirmPressed={() => {
            hideAlert();
          }}
        />

      </View>
    )
  }




  const _renderItem = ({ item }) => (


    <View >
      <View style={styles.row1}>
        <Text style={styles.row1Text}>{item.subject}</Text>
      </View>
      <View style={styles.row2}>
        <FontAwesomeIcon icon={faPhoneAlt} style={styles.icons} />
        <Text style={styles.row2Text}>{item.report}</Text>
      </View>
      <View style={styles.row3}>
        <FontAwesomeIcon icon={faEnvelopeOpen} style={styles.icons} />
        <Text style={styles.row3Text}>{item.name}</Text>
        {item.admin_reply != null ?
          <_renderAdminReply data = {item} />
          :
          null}
      </View>

    </View>

  );



  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 25 }}>
        <FlatList
          data={res}
          renderItem={_renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>



      <View style={{ position: 'absolute', bottom: 30, right: 30 }}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateReport')}>
          <FontAwesomeIcon icon={faPlusCircle} color='#28587D' size={56} />
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  icons: {
    color: '#003f5c',
    marginLeft: 15
  },
  row1: {
    marginBottom: 6
  },
  row2: {
    flexDirection: 'row',
    marginBottom: 6
  },
  row3: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 6
  },
  row1Text: {
    fontSize: 26,
    marginLeft: 15,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  row2Text: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  row3Text: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
})