import React from 'react'
import { View } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ForgotPasswordForm } from 'components/auth/ForgotPasswordForm'
import { useForgotPasswordMutation } from 'queries/auth'

const ForgotPasswordScreen = () => {
  const { error, mutate } = useForgotPasswordMutation()

  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <ForgotPasswordForm onSubmit={mutate} forgotPasswordError={!!error} />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default ForgotPasswordScreen
