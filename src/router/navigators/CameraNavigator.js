import { createStackNavigator } from 'react-navigation-stack';
import CameraPage from '../../pages/CameraPage';

const CameraNavigator = createStackNavigator({
    'Main': {
        screen: CameraPage,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default CameraNavigator;