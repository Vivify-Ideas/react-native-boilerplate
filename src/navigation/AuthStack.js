import { createStackNavigator } from 'react-navigation';
import AuthScreen from '../containers/auth/AuthScreen';
import LogInScreen from '../containers/auth/LogInScreen';
import SignUpScreen from '../containers/auth/SignUpScreen';
import ForgotPasswordScreen from '../containers/auth/ForgotPasswordScreen';
import ResetLinkSentScreen from '../containers/auth/ResetLinkSentScreen';
import OfflineComponent from '../components/OfflineComponent';
import ResetPasswordScreen from '../containers/auth/ResetPasswordScreen';
import I18n from '../i18n';

const AuthStack = createStackNavigator({
  AuthScreen: AuthScreen,
  LogIn: LogInScreen,
  SignUp: SignUpScreen,
  ForgotPassword: ForgotPasswordScreen,
  ResetLinkSent: ResetLinkSentScreen,
  ResetPasswordScreen: {
    screen: ResetPasswordScreen,
    navigationOptions: {
      title: I18n.t('auth.resetPassword')
    }
  },
  OfflineComponent: {
    screen: OfflineComponent,
    navigationOptions: {
      headerLeft: null
    }
  }
});
export default AuthStack;
