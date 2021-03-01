import React from 'react';
import {StyleSheet, Text, View} from 'react-native';


export default function MarkerEditHeader() {
    return(
        <View style={styles.header}>
            <Text style={styles.headerText}>KONTEYNER DÜZENLE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '70%',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        
    },
    headerText:{
        fontWeight:'bold',
        fontSize:20,
        color:'#333',
        letterSpacing:1,
        color:'#E1ECF5'
    }
})