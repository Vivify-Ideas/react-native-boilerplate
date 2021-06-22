import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import $t from 'i18n';
import SCREENS from 'constants/screens';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const LeftSlider = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={navigation.closeDrawer} title="Close me" />
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME_STACK.CHANGE_PASSWORD)}>
          <Text>{$t('profile.changePassword.changePassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.HOME_STACK.EDIT_PROFILE)}>
          <Text>{$t('profile.updateUser.updateProfile')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LeftSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
