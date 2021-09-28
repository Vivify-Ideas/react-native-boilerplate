import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import LeftSlider from 'screens/main/LeftSlider'
import SCREENS from 'constants/screens'
import HomeStack from './HomeNavigator'
import SettingsStack from './SettingsNavigator'
import { BottomTabParamList, RootDrawerParamList } from 'types/navigation'
import $t from 'i18n'
import { Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import Colors from 'constants/colors'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name={SCREENS.MAIN_STACK.HOME_STACK}
        component={HomeStack}
        options={{
          tabBarLabel: $t('tabNavigation.home'),
          tabBarIcon(props: { focused: boolean }) {
            return (
              <Icon
                as={<Ionicons name="home" />}
                color={props.focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
            )
          }
        }}
      />
      <BottomTab.Screen
        name={SCREENS.MAIN_STACK.SETTINGS_STACK}
        component={SettingsStack}
        options={{
          tabBarLabel: $t('tabNavigation.settings'),
          tabBarIcon(props: { focused: boolean }) {
            return (
              <Icon
                as={<Ionicons name="settings" />}
                color={props.focused ? Colors.activeIcon : Colors.inactiveIcon}
              />
            )
          }
        }}
      />
    </BottomTab.Navigator>
  )
}

const Drawer = createDrawerNavigator<RootDrawerParamList>()

export default function MainTabNavigator() {
  return (
    <Drawer.Navigator drawerContent={LeftSlider}>
      <Drawer.Screen
        name={'ProxyMainTab'}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  )
}
