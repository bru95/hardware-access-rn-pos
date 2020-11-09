/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageBackground, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { askPerms } from './AskPerms';

export default class BluePage extends React.Component {
    constructor() {
        super();
        this.manager = new BleManager();
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.manager.onStateChange((state) => {
                if (state === 'PoweredOn') {
                    this.scanAndConnect();
                }
            });
        } else {
            this.scanAndConnect();
        }
    }

    async scanAndConnect() {
        const BLE_DEVICE_NAME = 'brushed';//'[LG] webOS TV UM7500PSB';

        const permission1 = await askPerms(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
        const permission2 = await askPerms(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        //const permission3 = await askPerms(PermissionsAndroid.PERMISSIONS.BODY_SENSORS);

        console.log('permission1', permission1);
        console.log('permission2', permission2);
        // console.log('permission3', permission3);

        if (!permission1 || !permission2) {//} || !permission3) {
            console.log('Permissions not given');
            return;
        }

        this.manager.startDeviceScan(null, null, (error, device) => {
            console.log('Scanning...');
            //console.debug(device);

            if (error) {
                console.error(error);
                return;
            }

            if (device) {
                console.log(device.id, device.name);
            } else {
                console.error('no device');
            }

            if (device.name === BLE_DEVICE_NAME) {
                console.warn('Connecting to device:', device.name);
                this.manager.stopDeviceScan();
                device.connect()
                    .then((device) => {
                        console.warn('Discovering services and characteristics');
                        return device.discoverAllServicesAndCharacteristics();
                    })
                    .then((device) => {
                        console.warn('Setting notifications');
                    })
                    .then(() => {
                        console.warn('Listening...');
                    }, (error) => {
                        console.error(error.message);
                    });

            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../img/back.jpg')}
                    style={styles.bgImage}
                    resizeMode="cover">
                    <View style={[styles.section, styles.sectionLarge]}>
                        <Text>BluePage</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingRight: 10,
        paddingLeft: 10,
    },
    bgImage: {
        flex: 1,
        marginHorizontal: -20,
    },
    txtPoint: {
        color: 'white',
        fontSize: 80,
    },
    section: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionLarge: {
        flex: 4,
        justifyContent: 'space-around',
    },
});
