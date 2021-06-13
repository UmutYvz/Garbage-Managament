import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { createStackNavigator } from '@react-navigation/stack';

import reports from './reports'
import sendReply from './sendReply'

const Stack = createStackNavigator();

export default function AReportScreen({ navigation }) {

  return (
    <Stack.Navigator initialRouteName="reports">
      <Stack.Screen name="reports" component={reports} options={{
        title: 'Raporlar',
        headerStyle: {
          backgroundColor: '#28587D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <FontAwesomeIcon style={{ marginLeft: 16, marginTop: 2 }} icon={faArrowLeft} color='white' size={24} />
          </TouchableOpacity>
        ),
      }} />

      <Stack.Screen name="sendreply" component={sendReply} options={{
        title: 'Raporu Cevapla',
        headerStyle: {
          backgroundColor: '#28587D',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <FontAwesomeIcon style={{ marginLeft: 16, marginTop: 2 }} icon={faArrowLeft} color='white' size={24} />
          </TouchableOpacity>
        ),
      }} />
    </Stack.Navigator>
  );
}