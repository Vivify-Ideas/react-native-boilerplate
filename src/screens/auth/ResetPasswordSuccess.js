import $t from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SCREENS from '../../constants/screens';

const ResetPasswordSuccess = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <Text>{$t('auth.passwordResetSucces')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.AUTH_STACK.SIGN_IN)}>
          <Text>{$t('common.ok')}</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

ResetPasswordSuccess.propTypes = {
  navigation: PropTypes.object
};

ResetPasswordSuccess.navigationOptions = null;

export default ResetPasswordSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
