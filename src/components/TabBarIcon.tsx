import { Ionicons } from '@expo/vector-icons'
import { Icon } from 'native-base'
import React from 'react'
import Colors from '../constants/colors'

type TabBarIconProps = {
  name: string
  focused: boolean
}

const TabBarIcon = ({ name, focused }: TabBarIconProps) => {
  return (
    <Icon
      as={Ionicons}
      name={name}
      size={15}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  )
}

TabBarIcon.displayName = 'TabBarIcon'

export default TabBarIcon
