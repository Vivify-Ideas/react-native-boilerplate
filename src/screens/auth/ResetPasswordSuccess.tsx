import React from 'react'
import { Text, View, Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import $t from 'i18n'
import SCREENS from 'constants/screens'
import { ResetPasswordSuccessScreenNavigationProp } from 'types/navigation'

type ResetPasswordSuccessProps = {
  navigation: ResetPasswordSuccessScreenNavigationProp
}

const ResetPasswordSuccess = ({ navigation }: ResetPasswordSuccessProps) => {
  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <Text>{$t('auth.passwordResetSucces')}</Text>
        <Button onPress={() => navigation.navigate(SCREENS.AUTH_STACK.SIGN_IN)}>
          <Text>{$t('common.ok')}</Text>
        </Button>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default ResetPasswordSuccess
