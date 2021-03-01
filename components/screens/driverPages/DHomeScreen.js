import React from 'react';
import { Button, View,BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default class DHomeScreen extends React.Component {

  constructor() {
    super();

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  backAction = () => {
    Alert.alert("Dur!", "Çıkış yapmak istediğinize emin misiniz?", [
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
        <Button
          onPress={() => navigation.navigate('DHomeScreen')}
          title="Driver Home Screen"
        />
      </View>

    );
  }
}