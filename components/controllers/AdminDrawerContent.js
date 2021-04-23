import React from 'react';
import { View, StyleSheet, Alert, BackHandler } from 'react-native';
import { Avatar, Title, Caption, Drawer, Text, } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHome, faSignOutAlt, faUserEdit, faMapMarkedAlt, faRoute, faComment, faExclamationTriangle, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

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


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 25 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://scontent.fesb4-1.fna.fbcdn.net/v/t31.0-1/s200x200/19388454_10155487954414722_3247416001426396542_o.jpg?_nc_cat=100&ccb=2&_nc_sid=7206a8&_nc_ohc=ITy_VFCisoYAX9kgx8s&_nc_ht=scontent.fesb4-1.fna&tp=7&oh=4cd4bcb8d5692b491697726b2448bfc6&oe=60050D77'
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
                            onPress={() => { props.navigation.navigate('AHomeScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faUserEdit} color='#28587D' size={size} />
                            )}
                            label="Sürücüler"
                            onPress={() => { props.navigation.navigate('AManageDriverScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faMapMarkedAlt} color='#28587D' size={size} />
                            )}
                            label="Konteyner Düzenle"
                            onPress={() => { props.navigation.navigate('AManageBinScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faMapMarkerAlt} color='#28587D' size={size} />
                            )}
                            label="Konteyner Ekle"
                            onPress={() => { props.navigation.navigate('AAddBinScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faRoute} color='#28587D' size={size} />
                            )}
                            label="Rotaları Görüntüle"
                            onPress={() => { props.navigation.navigate('ASetRouteScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faComment} color='#28587D' size={size} />
                            )}
                            label="Yorumları Cevapla"
                            onPress={() => { props.navigation.navigate('ACommentsScreen') }}
                        />
                    </Drawer.Section>
                    <Drawer.Section style={styles.bottomDrawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesomeIcon icon={faExclamationTriangle} color='#28587D' size={size} />
                            )}
                            label="Raporları Gör"
                            onPress={() => { props.navigation.navigate('AReportScreen') }}
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