import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { HamburgerIcon } from 'native-base'
import React from 'react'

type MainHeaderProps = {
  navigation: DrawerNavigationHelpers
}

function MainHeader({ navigation }: MainHeaderProps) {
  return {
    headerLeft() {
      return (
        <HamburgerIcon
          size={6}
          mt={1}
          ml={5}
          onPress={() => {
            navigation.toggleDrawer()
          }}
        />
      )
    }
  }
}

export default MainHeader
