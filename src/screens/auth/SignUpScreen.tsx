import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import $t from 'i18n';
import { SignUpForm } from 'components/auth/SignUpForm';
import { useRegisterMutation } from 'queries/auth';

const SignUpScreen = () => {
  const { mutate, error } = useRegisterMutation();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <SignUpForm onSubmit={mutate} signUpErrors={{ email: error?.message || '' }} />
      </KeyboardAwareScrollView>
    </View>
  );
};

SignUpScreen.navigationOptions = {
  title: $t('auth.signUp'),
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
