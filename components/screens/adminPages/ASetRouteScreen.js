import * as React from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { createStackNavigator } from '@react-navigation/stack';
import routeList from '../adminPages/routeList'
import mapScreen from './adminRouteScreen'

const Stack = createStackNavigator();


export default function ASetRouteScreen({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="routeList" component={routeList} />
      <Stack.Screen name="MapScreen" component={mapScreen} />
    </Stack.Navigator>
  );
}