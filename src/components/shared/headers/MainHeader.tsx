import { Ionicons } from '@expo/vector-icons'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { Icon } from 'native-base'
import React from 'react'

type MainHeaderProps = {
  navigation: DrawerNavigationHelpers
}

const styles = {
  menuIcon: {
    marginLeft: 10,
    marginTop: 10
  }
}

const MainHeader = ({ navigation }: MainHeaderProps) => {
  return (
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

MainHeader.displayName = 'MainHeader'

export default MainHeader
