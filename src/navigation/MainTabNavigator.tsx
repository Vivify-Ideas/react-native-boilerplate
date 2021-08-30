import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LeftSlider from 'screens/main/LeftSlider';
import SCREENS from 'constants/screens';
import HomeStack from './HomeNavigator';
import SettingsStack from './SettingsNavigator';
import { BottomTabParamList, RootDrawerParamList } from 'types/navigation';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name={SCREENS.MAIN_STACK.HOME_STACK}
        component={HomeStack}
      />
      <BottomTab.Screen
        name={SCREENS.MAIN_STACK.SETTINGS_STACK}
        component={SettingsStack}
      />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export default function MainTabNavigator() {
  return (
    <Drawer.Navigator drawerContent={LeftSlider}>
      <Drawer.Screen name={'ProxyMainTab'} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
