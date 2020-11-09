import { createStackNavigator } from 'react-navigation-stack';
import BluePage from '../../pages/BluePage';

const BlueNavigator = createStackNavigator({
    'Main': {
        screen: BluePage,
        navigationOptions: {
            headerShown: false
        }
    }
});

export default BlueNavigator;