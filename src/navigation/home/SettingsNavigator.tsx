import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeSwitch } from 'components/shared/ThemeSwitch'
import SCREENS from 'constants/screens'
import $t from 'i18n'
import { Button, Text, View } from 'native-base'
import React from 'react'
import {
  SettingsScreenRouteProp,
  SettingsStackParamsList
} from 'types/navigation'
import MainHeader from '../../components/shared/headers/MainHeader'

const StackNavigator = createStackNavigator<SettingsStackParamsList>()

type SettingsStackProp = {
  navigation: DrawerNavigationHelpers
}

type SettingsScreenProp = {
  navigation: DrawerNavigationHelpers
  route: SettingsScreenRouteProp
}

const SettingsStack = ({ navigation }: SettingsStackProp) => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={SCREENS.SETTINGS_STACK.SETTINGS}
        options={() => MainHeader({ navigation })}
        initialParams={{ userId: 'User1' }}
      >
        {({ navigation, route }: SettingsScreenProp) => {
          const { userId = 'Unknown' } = route.params
          return (
            <View>
              <Text>
                {$t('profile.settings.settings')} {userId}
              </Text>
              <ThemeSwitch text={$t('profile.settings.darkMode')} />
              <View>
                <Button
                  onPress={() => {
                    navigation.navigate(SCREENS.MAIN_STACK.HOME_STACK, {
                      screen: SCREENS.HOME_STACK.HOME
                    })
                  }}
                >
                  {$t('profile.settings.toUserProfile')}
                </Button>
              </View>
            </View>
          )
        }}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  )
}

export default SettingsStack
