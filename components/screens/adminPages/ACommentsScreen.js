import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function ACommentsScreen({ navigation }) {
  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ position: 'absolute', top: 50, right: 20 }}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <FontAwesomeIcon icon={faBars} size={25} color='#16425b' />
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to COMMENTS"
      />
    </View>

  );
}