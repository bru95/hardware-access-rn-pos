import React from 'react';
import {
  Alert,
  ImageBackground,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

export default class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCameraVisible: false,
      photo: null,
    };
  }

  async takePicture() {
    try {
      const {uri} = await this.camera.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
        skipProcessing: true,
      });
      this.setPhoto(uri);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao fotografar');
    }
  }

  setPhoto(uri) {
    this.setState({isCameraVisible: false, photo: uri});
    console.log(uri);
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isCameraVisible}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={{flex: 1}}
            type={RNCamera.Constants.Type.back}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permissão para usar a câmera.',
              message: 'Precisamos sua permissão para usar a câmera',
              buttonPositive: 'OK',
              buttonNegative: 'Cancelar',
            }}
            captureAudio={false}>
            <Icon
              name="photo-camera"
              size={40}
              color={'#fff'}
              onPress={() => {
                this.takePicture();
              }}
              style={styles.btnPicture}
            />
            <Icon
              name="close"
              size={40}
              color={'#fff'}
              onPress={() => {
                this.setState({isCameraVisible: false});
              }}
              style={styles.btnClose}
            />
          </RNCamera>
        </Modal>

        <View style={styles.imgArea}>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={{uri: this.state.photo}}
          />
        </View>
        <View style={styles.btArea}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({isCameraVisible: true});
            }}>
            <Icon name="camera-alt" size={40} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({photo: null});
            }}>
            <Icon name="delete" size={40} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6598ba',
  },
  imgArea: {
    width: '100%',
    height: '50%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 60,
  },
  btArea: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 150,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPicture: {
    flex: 0,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  btnClose: {
    flex: 0,
    position: 'absolute',
    top: 30,
    right: 20,
  },
});
