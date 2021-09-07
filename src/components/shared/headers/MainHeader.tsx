import React from 'react'
/* eslint-disable  react/display-name */
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'native-base'

type MainHeaderProps = {
  navigation: any
}

function MainHeader({ navigation }: MainHeaderProps) {
  const styles = {
    menuIcon: {
      marginLeft: 10,
      marginTop: 10
    }
  }

  return {
    headerLeft: () => (
      <Icon
        as={Ionicons}
        name="ios-menu"
        size={10}
        onPress={() => {
          navigation.toggleDrawer()
        }}
        style={styles.menuIcon}
      />
    )
  }
}

export default MainHeader
