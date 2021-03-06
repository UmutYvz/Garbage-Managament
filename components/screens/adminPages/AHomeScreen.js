import React from 'react';
import { Text, View, BackHandler, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class AHomeScreen extends React.Component {

  constructor() {
    super();

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  backAction = () => {
    Alert.alert("Dur!", "Çıkmak istediğinize emin misiniz?", [
      {
        text: "Hayır",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Evet", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  openDrawer = () => {
    this.props.navigation.openDrawer();
    console.log("bir")
  }

  toggleDrawer() {
    this.props.navigation.toggleDrawer();
  }


  render() {
    return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', top: 50, right: 20 }}>
          <TouchableOpacity onPress={() => this.toggleDrawer()}>
            <FontAwesomeIcon icon={faBars} size={25} color='#28587D' />
          </TouchableOpacity>
        </View>
        <Text>
          Admin Kullanıcı Bilgileri
        </Text>
      </View>

    );
  }
}