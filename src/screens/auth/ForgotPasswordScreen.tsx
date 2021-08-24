import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ForgotPasswordForm } from 'components/auth/ForgotPasswordForm';
import { useForgotPasswordMutation } from 'queries/auth';

const ForgotPasswordScreen = () => {
  const { error, mutate } = useForgotPasswordMutation();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <ForgotPasswordForm onSubmit={mutate} forgotPasswordError={!!error} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
