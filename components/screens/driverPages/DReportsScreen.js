import * as React from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../driverPages/Home'
import Home2 from '../driverPages/Home2'

const Stack = createStackNavigator();


export default function DReportsScreen({ navigation }) {

  return (

    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={Home2} />
    </Stack.Navigator>

    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <View style={{ position: 'absolute', top: 50, right: 20 }}>
    //     <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
    //       <FontAwesomeIcon icon={faBars} size={25} color='#28587D' />
    //     </TouchableOpacity>
    //   </View>
    //   <Button
    //     onPress={() => navigation.navigate('DReportsScreen')}
    //     title="Driver Report Screen"
    //   />
    // </View>

  );
}