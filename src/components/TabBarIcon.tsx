import * as Icon from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

type TabBarIconProps = {
  name: any;
  focused: boolean;
};

const TabBarIcon = ({ name, focused }: TabBarIconProps) => {
  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={styles.icon}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

TabBarIcon.displayName = 'TabBarIcon';

export default TabBarIcon;

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3,
  },
});
