import $t from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SCREENS from '../../constants/screens';

const LeftSlider = ({ navigation }) => {
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

LeftSlider.propTypes = {
  navigation: PropTypes.object
};

export default LeftSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
