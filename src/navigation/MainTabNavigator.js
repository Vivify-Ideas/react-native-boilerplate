import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import SCREENS from '../constants/screens';
import LeftSlider from '../screens/main/LeftSlider';
import HomeStack from './HomeNavigator';
import SettingsStack from './SettingsNavigator';

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name={SCREENS.MAIN_STACK.HOME_STACK} component={HomeStack} />
      <BottomTab.Screen name={SCREENS.MAIN_STACK.SETTINGS_STACK} component={SettingsStack} />
    </BottomTab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

export default function MainTabNavigator() {
  return (
    <Drawer.Navigator drawerContent={LeftSlider}>
      <Drawer.Screen name={SCREENS.MAIN_STACK.HOME_STACK} component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
}
