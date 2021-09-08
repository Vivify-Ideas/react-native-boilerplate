import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import MainHeader from 'components/shared/headers/MainHeader'
import SCREENS from 'constants/screens'

import HomeScreen from 'screens/main/HomeScreen'
import ChangePasswordScreen from 'screens/main/profile/ChangePassword'
import EditProfileScreen from 'screens/main/profile/EditProfile'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

const StackNavigator = createStackNavigator()

type Props = {
  navigation: DrawerNavigationHelpers
}

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
  )
}

export default HomeStack
