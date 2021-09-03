import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Button, View } from 'native-base'
import $t from 'i18n'
import SCREENS from 'constants/screens'
import { DrawerContentComponentProps } from '@react-navigation/drawer'

const LeftSlider = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={navigation.closeDrawer}>
          {$t('profile.closeMe')}
        </Button>
        <Button
          onPress={() =>
            navigation.navigate(SCREENS.HOME_STACK.CHANGE_PASSWORD)
          }
        >
          {$t('profile.changePassword.changePassword')}
        </Button>
        <Button
          onPress={() => navigation.navigate(SCREENS.HOME_STACK.EDIT_PROFILE)}
        >
          {$t('profile.updateUser.updateProfile')}
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default LeftSlider

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
