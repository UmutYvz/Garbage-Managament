

import React from 'react';
import driverScreen from '../driverScreen'
import DriverDetailComponent from './driverDetailComponent'
import DriverEdit from './driverEdit'
import AddDriverScreen from './AAddDriverScreen'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();


export default class AManageDriverScreen extends React.Component {

 
  render() {
    return (
      <Stack.Navigator initialRouteName="DriverScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DriverScreen" component={driverScreen} />
        <Stack.Screen name="AddDriver" component={AddDriverScreen} />
        <Stack.Screen name="DriverDetailComponent" component={DriverDetailComponent} />
        <Stack.Screen name="DriverEdit" component={DriverEdit} />        
      </Stack.Navigator>
    );
    
  }
}
module.exports = AManageDriverScreen;

