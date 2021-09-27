import React from 'react'
import { Button, View } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import $t from 'i18n'
import { SignInForm } from 'components/auth/SignInForm'
import SCREENS from '../../constants/screens'
import { useLoginMutation } from 'queries/auth'
import { SignUpScreenNavigationProp } from 'types/navigation'

type SingInScreen = {
  navigation: SignUpScreenNavigationProp
}

const SignInScreen = ({ navigation }: SingInScreen) => {
  const { mutate, error } = useLoginMutation()

  const handleFacebookLogin = () => console.log('fb login')
  const handleGoogleLogin = () => console.log('google login')

  const goToSignUp = () => {
    navigation.navigate(SCREENS.AUTH_STACK.SIGN_UP)
  }

  const goToForgotPassword = () => {
    navigation.navigate(SCREENS.AUTH_STACK.FORGOT_PASSWORD)
  }

  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <SignInForm onSubmit={mutate} signInError={!!error} />
        <Button onPress={handleFacebookLogin}>
          {$t('auth.signInFacebook')}
        </Button>
        <Button onPress={handleGoogleLogin}>{$t('auth.signInGoogle')}</Button>
        <Button onPress={goToSignUp}>{$t('auth.signUp')}</Button>
        <Button onPress={goToForgotPassword}>
          {$t('auth.forgotPassword')}
        </Button>
      </KeyboardAwareScrollView>
    </View>
  )
}

SignInScreen.navigationOptions = {
  title: $t('auth.signIn')
}

export default SignInScreen
