import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import axios from 'axios'
import filter from 'lodash.filter';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import AwesomeAlert from 'react-native-awesome-alerts';


export default class feedbackScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bins: [],
            query: '',
            fullData: [],
            showAlert: false,
            selectedID: 0
        }
    }

    showAlert = (id) => {
        this.setState({ showAlert: true });
        this.setState({ selectedID: id });

    };

    hideAlert = () => {
        const index = this.state.bins.findIndex(item => item.id === this.state.selectedID)
        this.state.bins.splice(index,1)
       
        axios.post('http://192.168.1.2/backend/feedback.php', {
            id : this.state.selectedID
        }).then(
            console.log("Başarıyla silindi")
        ).catch(console.error)
        this.setState({ showAlert: false });
    };

    componentDidMount() {
        this._getBins()
    }

    _getBins = async () => {
        let response = await axios.get('http://192.168.1.2/backend/get_bins.php')
        this.setState({ bins: response.data })
        this.setState({ fullData: response.data })
    }

    handleSearch = text => {
        console.log("Yazılan yazı->", text)
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(this.state.fullData, data => {
            return this.contains(data, formattedQuery);
        });
        console.log("filtrelenmşi data->", filteredData)
        this.setState({ bins: filteredData });
        this.setState({ query: text });
    };

    contains = (data, query) => {
        console.log("Gelen Veri \n", data)
        console.log(data.address_m)

        if (data.address_m.includes(query) ||
            data.street.includes(query) ||
            data.district.includes(query) ||
            data.city.includes(query) ||
            data.country.includes(query)) {
            return true
        }

        return false;
    };

    renderHeader = () => {
        return (
            <View style={{ marginLeft: 30, marginRight: 30 }} >
                <View
                    style={styles.textInput}
                >
                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        clearButtonMode="always"
                        value={this.state.query}
                        onChangeText={queryText => this.handleSearch(queryText)}
                        placeholder="Search"
                        style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
                    />
                </View>
            </View>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Konteyner Durum Güncelle</Text>
                    <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }}
                        onPress={() => { this.props.navigation.goBack(null) }}
                        //onPress={() => this.showAlert()}
                    >
                        <FontAwesomeIcon icon={faAngleLeft} color='#003f5c' size={32} />
                    </TouchableOpacity>

                </View>
                <FlatList
                    ListHeaderComponent={this.renderHeader()}
                    data={this.state.bins}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <TouchableOpacity
                                style={styles.metaInfo}
                                onPress={() => this.showAlert(item.id)}
                            >
                                <Text style={styles.title}>{`${item.address_m}`}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <AwesomeAlert
                    show={this.state.showAlert}
                    showProgress={false}
                    title="Çöp boş olduğunu onaylıyor musunuz?"
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Hayır."
                    confirmText="Evet, eminim."
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                    cancelButtonColor="#f44336"
                    confirmButtonColor="#4CAF50"
                />

            </View>
        );

    }

}

module.exports = feedbackScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        marginTop: 35,
        marginBottom: 15,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#003f5c',
        borderBottomWidth: 1

    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#333',
        letterSpacing: 1,
        color: '#003f5c'
    },
    text: {
        fontSize: 20,
        color: '#101010',
        marginTop: 60,
        fontWeight: '700'
    },
    listItem: {
        marginTop: 5,
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#d8d8d8'
    },
    metaInfo: {
        marginLeft: 2
    },
    title: {
        fontSize: 18,
        width: 200,
        padding: 10
    },
    textInput: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        borderRadius: 30,
    }
});