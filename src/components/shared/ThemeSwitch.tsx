import React, { useState } from 'react'
import { Switch, HStack, Text, useColorMode, theme } from 'native-base'
import asyncStorageService from 'services/AsyncStorageService'

type ThemeSwitchProps = {
  text: string
}

export const ThemeSwitch = ({ text }: ThemeSwitchProps) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isChecked = colorMode === 'dark'

  const toggleDarkMode = async () => {
    toggleColorMode()
    await asyncStorageService.setItem('darkMode', isChecked.toString())
  }

  return (
    <HStack space={2} justifyContent="space-between">
      <Text>{text}</Text>
      <Switch
        onToggle={() => {
          toggleDarkMode()
        }}
        isChecked={isChecked}
      />
    </HStack>
  )
}
