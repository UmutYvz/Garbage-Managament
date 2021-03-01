
import DHomeScreen from '../screens/driverPages/DHomeScreen'
import DJobsScreen from '../screens/driverPages/DJobsScreen'
import DReportsScreen from '../screens/driverPages/DReportsScreen'
import DUpdateBinScreen from '../screens/driverPages/DUpdateBinScreen'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer'

import { DrawerContent } from '../controllers/DriverDrawerContent'


const Drawer = createDrawerNavigator();



export default function App(props) {

  const info = props.navigation.state.params.info;

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props} screenProps={{ info: info }} />}>

        <Drawer.Screen name="DHomeScreen" component={DHomeScreen} />
        <Drawer.Screen name="DJobsScreen" component={DJobsScreen} />
        <Drawer.Screen name="DReportsScreen" component={DReportsScreen} />
        <Drawer.Screen name="DUpdateBinScreen" component={DUpdateBinScreen} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

