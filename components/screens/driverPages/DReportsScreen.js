import * as React from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import CreateReport from '../driverPages/createReport'
import AllReports from '../driverPages/allReports'

const Stack = createStackNavigator();




export default function DReportsScreen({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="AllReports" >
      <Stack.Screen name="AllReports" component={AllReports} options={{
        title: 'Raporlar',
        headerStyle: {
          backgroundColor: '#28587D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.navigate('DHomeScreen') }}>
            <FontAwesomeIcon style={{ marginLeft: 16, marginTop: 2 }} icon={faArrowLeft} color='white' size={24} />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name="CreateReport" component={CreateReport} options={{
        title: 'Rapor Ekle',
        headerStyle: {
          backgroundColor: '#28587D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.navigate('AllReports')}}>
            <FontAwesomeIcon style={{ marginLeft: 16, marginTop: 2 }} icon={faArrowLeft} color='white' size={24} />
          </TouchableOpacity>
        ),
      }} />
    </Stack.Navigator>
  );
}