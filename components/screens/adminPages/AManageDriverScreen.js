

import React from 'react';
import DriverScreen from '../driverScreen'


export default class AManageDriverScreen extends React.Component {

 
  render() {
    return (
      <DriverScreen navigation={ this.props.navigation }/>
    );
    
  }
}
module.exports = AManageDriverScreen;

