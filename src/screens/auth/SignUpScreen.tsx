import React from 'react'
import { View } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import $t from 'i18n'
import { SignUpForm } from 'components/auth/SignUpForm'
import { useRegisterMutation } from 'queries/auth'

const SignUpScreen = () => {
  const { mutate, error } = useRegisterMutation()

  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <SignUpForm
          onSubmit={mutate}
          signUpErrors={{ email: error?.message || '' }}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

SignUpScreen.navigationOptions = {
  title: $t('auth.signUp')
}

export default SignUpScreen
