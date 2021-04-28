import * as Icon from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const TabBarIcon = ({ name, focused }) => {
  return (
    <Icon.Ionicons
      name={name}
      size={26}
      style={styles.icon}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

TabBarIcon.propTypes = {
  name: PropTypes.string.isRequired,
  focused: PropTypes.bool
};

TabBarIcon.displayName = 'TabBarIcon';
export default TabBarIcon;

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
});
