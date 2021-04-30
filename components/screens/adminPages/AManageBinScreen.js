
import React from 'react';
import MapScreen from '../mapScreen'
import MarkerDetail from '../adminPages/mapDetailComponent'
import MarkerEdit from '../adminPages/markerEdit'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class AManageBinScreen extends React.Component {


  render() {
    return (

      <Stack.Navigator initialRouteName="MapScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MapScreen" component={MapScreen} />
        <Stack.Screen name="MarkerDetail" component={MarkerDetail} />
        <Stack.Screen name="MarkerEdit" component={MarkerEdit} />        
      </Stack.Navigator>

    );
  }
}
module.exports = AManageBinScreen;

//