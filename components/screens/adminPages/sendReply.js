import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

export default function sendReply(props) {
    useEffect(() => {
        //console.log(props)
    })

    const [reply, setReply] = useState('')
    const [countReply, setCountReply] = useState(500)

    const setCountReplyy = (text) => {
        setReply(text)
        setCountReply(500 - text.length)
    }

    const sendReply = () => {
        console.log(reply)
        axios.post('http://192.168.1.2/backend/reply_report.php', {
            message: reply,
            id: props.route.params.item.id
        }).then(props.navigation.replace('reports')).catch((error) => console.log(error))
    }


    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset="25">

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Raporu Düzenleyen:</Text>
                    <View style={styles.row}>
                        <Text style={styles.input}>{props.route.params.item.name}</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Rapor Konusu:</Text>
                    <View style={styles.row}>
                        <Text style={styles.input}>{props.route.params.item.subject}</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Rapor İçeriği:</Text>
                    <View style={styles.row}>
                        <Text style={styles.input}>{props.route.params.item.report}</Text>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Cevabınız:</Text>
                    <View style={styles.row}>
                        <TextInput onChangeText={(text) => setCountReplyy(text)} autoCapitalize="none" style={styles.input} maxLength={500} />
                        <Text style={{ fontSize: 10, color: '#28587D', }}>{countReply}</Text>
                    </View>
                </View>



                <TouchableOpacity onPress={() => sendReply()} style={styles.button}>
                    <Text style={styles.buttonText}>GÖNDER</Text>
                </TouchableOpacity>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    headerText: {
        color: '#353031',
        fontWeight: 'bold',
        fontSize: 34,
        marginBottom: 10,
    },
    inputContainer: {
        backgroundColor: '#f4f6f8',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 5,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputLabel: {
        fontSize: 14,
        color: '#28587D',
    },
    input: {
        color: '#353031',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 3,
        marginRight: 10,
        flex: 1,
    },
    error: {
        backgroundColor: '#cc0011',
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#28587D',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});