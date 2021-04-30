import * as React from 'react';
import FeedBackScreen from '../feedbackScreen'


export default class UFeedBack extends React.Component {

 
  render() {
    return (
      <FeedBackScreen navigation={ this.props.navigation }/>
    );
    
  }
}
module.exports = UFeedBack;