import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

import BlueNavigator from './navigators/BlueNavigator';
import HttpRequestNavigator from './navigators/HttpRequestNavigator';
import MapsNavigator from './navigators/MapsNavigator';
import CameraNavigator from './navigators/CameraNavigator';

const AppBottomNavigator = createBottomTabNavigator(
    {
        Bluetooth: {
            screen: BlueNavigator,
            navigationOptions: {
                headerShown: false,
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="bluetooth" color={'#000'} size={20} />
            }
        },
        Maps: {
            screen: MapsNavigator,
            navigationOptions: {
                headerShown: false,
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="my-location" color={'#000'} size={20} />
            }
        },
        Camera: {
            screen: CameraNavigator,
            navigationOptions: {
                headerShown: false,
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="camera-alt" color={'#000'} size={20} />
            }
        },
        HttpRequest: {
            screen: HttpRequestNavigator,
            navigationOptions: {
                headerShown: false,
                title: "Pessoas",
                tabBarIcon: ({ tintColor }) =>
                    <Icon name="people-alt" color={'#000'} size={20} />
            }
        }
    },
    {
        initialRouteName: 'Maps',
        headerMode: 'screen'
    }
);

const Navigator = createStackNavigator(
    {
        'Bottom': {
            screen: AppBottomNavigator
        }
    }
);

const AppContainer = createAppContainer(Navigator);
export default AppContainer;