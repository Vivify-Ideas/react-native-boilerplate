import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';
import { useResetPassword } from '../../queries/auth';

const ResetPasswordScreen = ({ navigation }) => {
  const { error, mutate } = useResetPassword();

  const handleSubmit = resetPasswordData => {
    mutate({
      ...resetPasswordData,
      token: navigation.getParam('forgot_password_token')
    });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <ResetPasswordForm onSubmit={handleSubmit} resetPasswordError={!!error} />
      </KeyboardAwareScrollView>
    </View>
  );
};

ResetPasswordScreen.propTypes = {
  navigation: PropTypes.object
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
