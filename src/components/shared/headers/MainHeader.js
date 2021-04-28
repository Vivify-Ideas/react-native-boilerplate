import * as Icon from '@expo/vector-icons';
import React from 'react';
/* eslint-disable react/display-name */
export default function MainHeader({ navigation }) {
  const styles = {
    menuIcon: {
      marginLeft: 10,
      marginTop: 10
    }
  };

  return {
    headerLeft: () => (
      <Icon.Ionicons
        name="ios-menu"
        size={24}
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={styles.menuIcon}
      />
    )
  };
}
