import React from 'react';

// Screens
import AHomeScreen from './adminPages/AHomeScreen'
import AManageDriverScreen from './adminPages/AManageDriverScreen'
import AAddBinScreen from './adminPages/AAddBinScreen'
import AManageBinScreen from './adminPages/AManageBinScreen'
import AReportScreen from './adminPages/AReportScreen'
import ASetRouteScreen from './adminPages/ASetRouteScreen'
import ACommentsScreen from './adminPages/ACommentsScreen'
import AAddDriverScreen from './adminPages/AAddDriverScreen'
import { DrawerContent } from '../controllers/AdminDrawerContent'
import MapDetailComponent from '../mapDetailComponent'
import MarkerEdit from '../markerEdit'
import DriverEdit from '../driverEdit'
import DriverDetailComponent from '../driverDetailComponent'


import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator } from '@react-navigation/drawer'


const Drawer = createDrawerNavigator();



export default function App(props) {

    const info = props.navigation.state.params.info;
   

    return (
      <NavigationContainer>
        <Drawer.Navigator screenProps={()=>props}  drawerContent={props => <DrawerContent {...props} screenProps={{info:info}}  />}>
          
          <Drawer.Screen name="AHomeScreen" component={AHomeScreen} />
          <Drawer.Screen name="AManageDriverScreen" component={AManageDriverScreen} />
          <Drawer.Screen name="AManageBinScreen" component={AManageBinScreen} />
          <Drawer.Screen name="AAddBinScreen" component={AAddBinScreen} />
          <Drawer.Screen name="AAddDriverScreen" component={AAddDriverScreen} />
          <Drawer.Screen name="AReportScreen" component={AReportScreen} />
          <Drawer.Screen name="ASetRouteScreen" component={ASetRouteScreen} />
          <Drawer.Screen name="ACommentsScreen" component={ACommentsScreen} />
          <Drawer.Screen name="MarkerDetail" component={MapDetailComponent} />
          <Drawer.Screen name="MarkerEdit" component={MarkerEdit} />
          <Drawer.Screen name="DriverEdit" component={DriverEdit} />
          <Drawer.Screen name="DriverDetail" component={DriverDetailComponent} />
        
        </Drawer.Navigator>
      </NavigationContainer>
    );
}

