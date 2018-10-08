import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../containers/HomeScreen';
import NotificationListScreen from '../containers/NotificationListScreen';
import NotificationSettingsScreen from '../containers/NotificationSettingsScreen';
import EditProfileScreen from '../containers/profile/EditProfileScreen';
import EditPasswordScreen from '../containers/profile/EditPasswordScreen';

const AppStack = createStackNavigator({
  HomeScreen,
  NotificationListScreen,
  NotificationSettingsScreen,
  EditProfileScreen,
  EditPasswordScreen
});
export default AppStack;
