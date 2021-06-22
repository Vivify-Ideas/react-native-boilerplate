import React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import MainHeader from 'components/shared/headers/MainHeader';
import SCREENS from 'constants/screens';

import HomeScreen from 'screens/main/HomeScreen';
import ChangePasswordScreen from 'screens/main/profile/ChangePassword';
import EditProfileScreen from 'screens/main/profile/EditProfile';
import { HomeStackNavigationProp } from 'types/navigation';

const StackNavigator = createStackNavigator();

type Props = {
  navigation: HomeStackNavigationProp;
};

const HomeStack = ({ navigation }: Props) => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={SCREENS.HOME_STACK.HOME}
        component={HomeScreen}
        options={() => MainHeader({ navigation })}
      />
      <StackNavigator.Screen
        name={SCREENS.HOME_STACK.CHANGE_PASSWORD}
        component={ChangePasswordScreen}
        options={() => MainHeader({ navigation })}
      />
      <StackNavigator.Screen
        name={SCREENS.HOME_STACK.EDIT_PROFILE}
        component={EditProfileScreen}
        options={() => MainHeader({ navigation })}
      />
    </StackNavigator.Navigator>
  );
};

export default HomeStack;
