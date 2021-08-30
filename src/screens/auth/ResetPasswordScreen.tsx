import React from 'react'
import { View } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ResetPasswordForm } from 'components/auth/ResetPasswordForm'
import { useResetPasswordMutation } from 'queries/auth'
import { ResetPasswordRouteProp } from 'types/navigation'

type ResetPasswordScreenProps = {
  route: ResetPasswordRouteProp
}
const ResetPasswordScreen = ({ route }: ResetPasswordScreenProps) => {
  const { error, mutate } = useResetPasswordMutation()
  const { forgot_password_token } = route.params

  const handleSubmit = (resetPasswordData: any): void => {
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
