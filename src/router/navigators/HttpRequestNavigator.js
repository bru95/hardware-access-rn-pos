import { createStackNavigator } from 'react-navigation-stack';
import HttpRequestPage from '../../pages/HttpRequestPage';

const HttpRequestNavigator = createStackNavigator({
    'Main': {
        screen: HttpRequestPage,
        navigationOptions: {
            title: 'Pessoas',
            headerTitleStyle: {
                textAlign: 'left',
                fontSize: 20,
            }
        }
    },
},
    {
        defaultNavigationOptions: {
            headerTintColor: '#504d4d',
            headerStyle: {
                backgroundColor: '#dbd5d5',
                borderBottomColor: '#f4f2ff',
            },
            headerTitleStyle: {
                color: 'black',
                fontSize: 20,
                flexGrow: 1,
                textAlign: 'center',
            },
        }
    }
);

export default HttpRequestNavigator;