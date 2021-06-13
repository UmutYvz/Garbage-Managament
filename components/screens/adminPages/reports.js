import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View, Text, FlatList } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlusCircle, faPhoneAlt, faCalendarCheck, faEnvelopeOpen, faCheckCircle, faReply, faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import AwesomeAlert from 'react-native-awesome-alerts';

import axios from 'axios'

export default function reports({ navigation }) {
    const [res, setRes] = useState();

    const [message, setMessage] = useState('')

    useEffect(() => {
        getData();
    })


    const getData = async () => {
        const response = await axios.get('http://192.168.1.2/backend/get_report_empty.php')
        setRes(response.data)
    }


    const sendReply = () => {
        axios.post('http://192.168.1.2/backend/reply_report.php', {
            message: message,
            id: props.data.id
        }).then(response => console.log(response.data)).catch((error) => console.log(error))
        getData();
    }



    const _renderItem = ({ item }) => (
        <View >
            <View style={styles.row1}>
                <Text style={styles.row1Text}>{item.subject}</Text>
            </View>
            <View style={styles.row2}>
                <FontAwesomeIcon icon={faPhoneAlt} style={styles.icons} />
                <Text style={styles.row2Text}>{item.report}</Text>
            </View>
            <View style={styles.row3}>
                <FontAwesomeIcon icon={faEnvelopeOpen} style={styles.icons} />
                <Text style={styles.row3Text}>{item.name}</Text>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 40
                }}>

                    < FontAwesomeIcon icon={faReply} style={{
                        color: '#003f5c',
                    }} />
                    <TouchableOpacity onPress={() => navigation.navigate('sendreply', { item })}>
                        <Text style={{ color: '#28587D', marginLeft: 5 }}>Yanıtlamak için buraya dokun!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );



    return (
        <View style={{ flex: 1 }}>

            <View style={{ marginTop: 25 }}>
                <FlatList
                    data={res}
                    renderItem={_renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        </View>

    );
}



const styles = StyleSheet.create({
    icons: {
        color: '#003f5c',
        marginLeft: 15
    },
    row1: {
        marginBottom: 6
    },
    row2: {
        flexDirection: 'row',
        marginBottom: 6
    },
    row3: {
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 6
    },
    row1Text: {
        fontSize: 26,
        marginLeft: 15,
        fontWeight: 'normal',
        letterSpacing: 0.5,
    },
    row2Text: {
        fontSize: 13,
        marginLeft: 4,
        fontWeight: 'normal',
        letterSpacing: 0.5,
    },
    row3Text: {
        fontSize: 13,
        marginLeft: 4,
        fontWeight: 'normal',
        letterSpacing: 0.5,
    },
})