import { createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreen from '../containers/auth/AuthLoadingScreen';
import AuthStack from '../navigation/AuthStack';
import AppStack from '../navigation/AppStack';

const RootStack = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AppStack: AppStack,
    AuthStack: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
);
export default RootStack;
