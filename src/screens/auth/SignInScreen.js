import $t from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SignInForm } from '../../components/auth/SignInForm';
import SCREENS from '../../constants/screens';
import { useLogin } from '../../queries/auth';

const SignInScreen = ({ navigation }) => {
  const { mutate, error } = useLogin();

  const handleFacebookLogin = () => console.log('fb login');
  const handleGoogleLogin = () => console.log('google login');

  const goToSignUp = () => {
    navigation.navigate(SCREENS.AUTH_STACK.SIGN_UP);
  };

  const goToForgotPassword = () => {
    navigation.navigate(SCREENS.AUTH_STACK.FORGOT_PASSWORD);
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid>
        <SignInForm onSubmit={mutate} signInError={!!error} />

        <Button title="Sign in with Facebook!" onPress={handleFacebookLogin} />
        <Button title="Sign in with Google!" onPress={handleGoogleLogin} />
        <Button title="Sign up!" onPress={goToSignUp} />
        <Button title="Forgot password" onPress={goToForgotPassword} />
      </KeyboardAwareScrollView>
    </View>
  );
};

SignInScreen.propTypes = {
  navigation: PropTypes.object
};

SignInScreen.navigationOptions = {
  title: $t('auth.signIn')
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
