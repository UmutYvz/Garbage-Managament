
import DHomeScreen from '../screens/driverPages/DHomeScreen'
import DJobsScreen from '../screens/driverPages/DJobsScreen'
import DReportsScreen from '../screens/driverPages/DReportsScreen'

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'

import { DrawerContent } from '../controllers/DriverDrawerContent'


const Drawer = createDrawerNavigator();



export default function App(props,{navigation}) {


  const info = props.navigation.state.params.info;

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} screenProps={{ info: info }} />}>

        <Drawer.Screen name="DHomeScreen" component={DHomeScreen} />
        <Drawer.Screen name="DJobsScreen" component={DJobsScreen} />
        <Drawer.Screen name="DReportsScreen" component={DReportsScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

