import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {askPerms} from './AskPerms';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

export default class MapsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        latitude: -29.973907,
        longitude: -51.194862,
        latitudeDelta: 0.1,
        longitudeDelta: 0.02,
      },
    };
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    } else {
      askPerms(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }
  }

  setCurrentPosition() {
    let getPosition = true;

    if (Platform.OS === 'android') {
      if (PermissionsAndroid.RESULTS.GRANTED === 'granted') {
        getPosition = true;
      } else {
        getPosition = false;
        Alert.alert('Permissão de localização não concedida');
      }
    }

    if (getPosition) {
      Geolocation.getCurrentPosition(
        (position) => {
          const {latitude, longitude} = position.coords;
          this.setState({
            position: {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.02,
            },
          });
        },
        (error) => {
          console.error(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={this.state.position}>
          <Marker
            coordinate={this.state.position}
            title={'Marker :D'}
            description={'Novo marcador no mapa'}
          />
        </MapView>

        <View style={styles.box}>
          <Text style={styles.boxTitle}>Sua Localização</Text>
          <View style={styles.boxLatLon}>
            <Text style={{fontSize: 16}}>Latitude</Text>
            <Text style={{fontSize: 16}}>{this.state.position.latitude}</Text>
          </View>
          <View style={styles.boxLatLon}>
            <Text style={{fontSize: 16}}>Longitude</Text>
            <Text style={{fontSize: 16}}>{this.state.position.longitude}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setCurrentPosition();
          }}>
          <Icon name="my-location" color={'#fff'} size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '100%',
    width: '100%',
  },
  box: {
    backgroundColor: '#021c3c',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -170,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    //elevation: 5,
  },
  boxTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  boxLatLon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#e7eaaa',
    borderRadius: 150,
    marginTop: -25,
    opacity: 0.75,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    //elevation: 8,
  },
});
