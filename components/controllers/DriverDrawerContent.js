import React, {useState} from 'react';
import { View, StyleSheet, Alert, BackHandler, Text } from 'react-native';
import { Avatar, Title, Caption, Drawer, } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSignOutAlt, faBullhorn, faWrench, faExclamationTriangle, faRoad } from '@fortawesome/free-solid-svg-icons'


export function DrawerContent(props) {
    const backAction = () => {
        Alert.alert("Dur!", "Çıkmak istediğinize emin misiniz?", [
            {
                text: "Hayır",
                onPress: () => null,
                style: "cancel"
            },
            { text: "Evet", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    // const [info, setInfo] = useState(0);
    // setInfo(props.screenProps.info);
    //console.log(props.screenProps.info);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <   Avatar.Image
                                source={{
                                    uri: 'https://scontent.fesb4-1.fna.fbcdn.net/v/t31.0-8/1400755_10202665379623905_786329892_o.jpg?_nc_cat=110&ccb=2&_nc_sid=174925&_nc_ohc=S-tcbnWjGIgAX_9gDiX&_nc_ht=scontent.fesb4-1.fna&oh=c9719de240549da28e0e1ba0eefd92a3&oe=6008833E'
                                }}

                                size={50}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{props.screenProps.info.full_name}</Title>
                                <Caption style={styles.caption}>@{props.screenProps.info.role_id == 0 ? <Text style={styles.caption}>Yönetici</Text> : ((props.screenProps.info.role_id == 1) ? <Text style={styles.caption}>Sürücü</Text> : <Text style={styles.caption}>Kullanıcı</Text>)}</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.bottomDrawerSection, { marginTop: 20 }}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faHome} color='#28587D' size={size} />
                            )}
                            label="Giriş"
                            onPress={() => { props.navigation.navigate('DHomeScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faRoad} color='#28587D' size={size} />
                            )}
                            label="Aktif Rota"
                            onPress={() => { props.navigation.navigate('DJobsScreen', { info : props.screenProps.info }) }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faWrench} color='#28587D' size={size} />
                            )}
                            label="Konteyner Güncelle"
                            onPress={() => { props.navigation.navigate('DUpdateBinScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faExclamationTriangle} color='#28587D' size={size} />
                            )}
                            label="Raporlar"
                            onPress={() => { props.navigation.navigate('DReportsScreen') }}
                        />
                    </Drawer.Section>

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <FontAwesomeIcon icon={faSignOutAlt} color='#28587D' size={size} />
                    )}
                    label="Uygulamayı Kapat"
                    onPress={() => backAction()}
                />
            </Drawer.Section>
        </View>
    );
}


const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        backgroundColor: '#E1ECF5',
        paddingLeft: 20,
        paddingBottom: 20
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: '#28587D'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#28587D'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {

        marginBottom: 5,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});