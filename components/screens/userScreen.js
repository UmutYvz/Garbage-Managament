import React from 'react';

import UHomeScreen from './userPages/UHomeScreen'
import UCommentsScreen from './userPages/UCommentsScreen'
import UMyComments from './userPages/UMyComments'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from '../controllers/UserDrawerContent'


const Drawer = createDrawerNavigator();

export default function App(props) {

  const info = props.navigation.state.params.info;

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} screenProps={{ info: info }} />}>

        <Drawer.Screen name="UHomeScreen" component={UHomeScreen} />
        <Drawer.Screen name="UCommentsScreen" component={UCommentsScreen} />
        <Drawer.Screen name="UMyComments" component={UMyComments} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

