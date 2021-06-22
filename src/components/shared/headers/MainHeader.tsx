/* eslint-disable  react/display-name */
import * as Icon from '@expo/vector-icons';
import React from 'react';

// @ts-ignore
function MainHeader({ navigation }) {
  const styles = {
    menuIcon: {
      marginLeft: 10,
      marginTop: 10,
    },
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
    ),
  };
}

export default MainHeader;
