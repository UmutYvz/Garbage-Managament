import { StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faRedoAlt, faPlus, faPhoneAlt, faCalendarCheck, faEnvelopeOpen, faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default class driverScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: []
    }

    this.goToDriverDetail = this.goToDriverDetail.bind(this);
  }



  componentDidMount() {
    //fetch('https://my-json-server.typicode.com/UmutYvz/JSONHOLDER/report')
    fetch('http://192.168.1.4/backend/get_drivers.php')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.setState({
          isLoading: false,
          dataSource: data,
        })
      })
      .catch(console.error)
  }



  goToDriverDetail(item) {
    this.props.navigation.navigate('DriverDetail', { item })
  }




  _renderItem = ({ item }) => (


    <TouchableOpacity onPress={() => { this.goToDriverDetail(item) }}>
      <View style={styles.row1}>
        <Text style={styles.row1Text}>{item.full_name}</Text>
      </View>
      <View style={styles.row2}>
        <FontAwesomeIcon icon={faPhoneAlt} style={styles.icons} />
        <Text style={styles.row2Text}>{item.phone}</Text>

        <FontAwesomeIcon icon={faCalendarCheck} style={styles.icons} />
        <Text style={styles.row2Text}>{item.start_day}</Text>
      </View>
      <View style={styles.row3}>
        <FontAwesomeIcon icon={faEnvelopeOpen} style={styles.icons} />
        <Text style={styles.row3Text}>{item.email}</Text>
      </View>
    </TouchableOpacity>

  );


  render() {

    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.headerText}>SÜRÜCÜ LİSTESİ</Text>
            <TouchableHighlight onPress={() => { this.componentDidMount(); }}>
              <View style={styles.rtouchable}>
                <FontAwesomeIcon icon={faRedoAlt} color='white' size={25} />
              </View>
            </TouchableHighlight>
            <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
              onPress={() => { this.props.navigation.goBack(null) }}
            >
              <FontAwesomeIcon icon={faAngleLeft} color='white' size={32} />
            </TouchableOpacity>

          </View>


          <TouchableHighlight style={styles.rightB} onPress={() => { this.props.navigation.navigate('AAddDriverScreen') }}>
            <FontAwesomeIcon icon={faPlus} color='white' size={40} />
          </TouchableHighlight>


          <FlatList
            data={this.state.dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index}
          />

        </View>
      );
    }
  }
}

module.exports = driverScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#caf0e9',
    backgroundColor: 'white',

  },
  header: {
    marginTop: 35,
    marginBottom: 15,
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
  icons: {
    color: '#003f5c',
    marginLeft: 15
  },
  rightB: {
    width: 60,
    height: 60,
    backgroundColor: '#003f5c',
    borderRadius: 100,
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  rtouchable: {
    marginLeft: 20
  }


});