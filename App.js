import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import LoginScreen from './components/screens/loginScreen'
import RegisterScreen from './components/screens/registerScreen'
import adminScreen from './components/screens/adminScreen'
import userScreen from './components/screens/userScreen'
import driverScreen from './components/screens/driverMainPage'
import MapDetailComponent from './components/mapDetailComponent'
import DriverDetailComponent from './components/driverDetailComponent'
import MapDetailHeader from './components/shared/mapDetailHeader'
import MarkerEditHeader from './components/shared/markerEditHeader'
import MarkerEdit from './components/markerEdit'
import React from 'react';
import example from './components/example2';
//import example from './components/example'


const navigator = createStackNavigator({

    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    AdminHome: {
        screen: adminScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    UserHome: {
        screen: userScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    DriverHome: {
        screen: driverScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    MarkerDetail: {
        screen: MapDetailComponent,

        navigationOptions: {
            headerTitle: () => <MapDetailHeader />,
            headerLeft: () => null,
            headerStyle: {
                backgroundColor: '#003f5c'
            }
        },
    },
    MarkerEdit: {
        screen: MarkerEdit,

        navigationOptions: {
            headerTitle: () => <MarkerEditHeader />,
            headerLeft: () => null,
            headerStyle: {
                backgroundColor: '#003f5c'
            }
        },
    },
    DriverDetail: {
        screen: DriverDetailComponent,
        navigationOptions: {
            headerTitle: () => <MarkerEditHeader />,
            headerLeft: () => null,
            headerStyle: {
                backgroundColor: '#003f5c'
            }
        },
    },
    Example: {
        screen: example,
        navigationOptions: {
            headerShown: false
        },
    }


},

    {
        //initialRouteName: 'Example',
        initialRouteName: 'Login',
    });

export default createAppContainer(navigator);