import { createStackNavigator } from 'react-navigation-stack';
import MapsPage from '../../pages/MapsPage';

const MapsNavigator = createStackNavigator({
    'Main': {
        screen: MapsPage,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default MapsNavigator;