import React from 'react'; import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import LoginScreen from './components/screens/loginScreen'
import RegisterScreen from './components/screens/registerScreen'
import adminScreen from './components/screens/adminScreen'
import userScreen from './components/screens/userScreen'
import driverScreen from './components/screens/driverMainPage'
import MarkerEditHeader from './components/shared/markerEditHeader'
import example2 from './components/example2';



const navigator = createStackNavigator({

    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerShown: false
        },
    },
    Example: {
        screen: example2,
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
    
},

    {
        //initialRouteName: 'Example',
        initialRouteName: 'Login',
    });

export default createAppContainer(navigator);