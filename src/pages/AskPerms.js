import {PermissionsAndroid} from 'react-native';

export async function askPerms(permType) {
  try {
    const granted = await PermissionsAndroid.request(permType, {
      title: 'Permissão para uso de dispositivo.',
      message: 'Conceder permissão?',
      buttonNeutral: 'Depois',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Uso especial concedido:', permType);
      return true;
    } else {
      console.log('Uso especial negado:', permType);
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
