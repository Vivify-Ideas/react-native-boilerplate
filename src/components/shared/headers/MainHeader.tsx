import React from 'react'
/* eslint-disable  react/display-name */
import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import { Platform } from 'react-native'

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
        name={Platform.OS ? 'ios-menu' : 'md-menu'}
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
