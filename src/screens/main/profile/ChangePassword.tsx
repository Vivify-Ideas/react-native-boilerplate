import React from 'react'
import { View } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ChangePasswordForm } from 'components/profile/ChangePasswordForm'
import { useUpdatePasswordMutation } from 'queries/user'

const ChangePassword = () => {
  const { mutate, error } = useUpdatePasswordMutation()

  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <ChangePasswordForm
          onSubmit={mutate}
          invalidOldPasswordError={!!error}
        />
      </KeyboardAwareScrollView>
    </View>
  )
}

export default ChangePassword
