import React from 'react'
import { Button, Text, View } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import $t from 'i18n'
import SCREENS from 'constants/screens'
import { ForgotPasswordSuccessNavigationProp } from 'types/navigation'

type ForgotPasswordSuccessProps = {
  navigation: ForgotPasswordSuccessNavigationProp
}

const ForgotPasswordSuccess = ({ navigation }: ForgotPasswordSuccessProps) => {
  return (
    <View>
      <KeyboardAwareScrollView enableOnAndroid>
        <Text>{$t('auth.forgotPasswordSuccess')}</Text>
        <Button onPress={() => navigation.navigate(SCREENS.AUTH_STACK.SIGN_IN)}>
          {$t('common.ok')}
        </Button>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default ForgotPasswordSuccess
