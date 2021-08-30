import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Button, View } from 'native-base';
import $t from 'i18n';
import SCREENS from 'constants/screens';
import { DrawerContentComponentProps } from '@react-navigation/drawer';

const LeftSlider = ({ navigation }: DrawerContentComponentProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button onPress={navigation.closeDrawer}>Close me</Button>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(SCREENS.HOME_STACK.CHANGE_PASSWORD)
          }
        >
          <Text>{$t('profile.changePassword.changePassword')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.HOME_STACK.EDIT_PROFILE)}
        >
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
