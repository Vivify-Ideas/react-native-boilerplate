import { ResetPasswordForm } from 'components/auth/ResetPasswordForm'
import { View } from 'native-base'
import { useResetPasswordMutation } from 'queries/auth'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { PasswordRecoveryProps } from 'types/auth'
import { ResetPasswordRouteProp } from 'types/navigation'

type ResetPasswordScreenProps = {
  route: ResetPasswordRouteProp
}
const ResetPasswordScreen = ({ route }: ResetPasswordScreenProps) => {
  const { error, mutate } = useResetPasswordMutation()
  const { forgot_password_token } = route.params

  const handleSubmit = (
    resetPasswordData: Omit<PasswordRecoveryProps, 'token'>
  ): void => {
    mutate({
      ...resetPasswordData,
      token: forgot_password_token
    })
  }

  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <ResetPasswordForm
          onSubmit={handleSubmit}
          resetPasswordError={!!error}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default ResetPasswordScreen
