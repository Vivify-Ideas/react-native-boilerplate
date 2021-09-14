import React from 'react'
import { Formik, Field } from 'formik'
import { View, Button } from 'native-base'
import $t from 'i18n'
import { forgotPasswordValidationRules } from 'validation/auth'
import { TextInputField } from '../shared/FormFields'
import ErrorText from '../shared/Text/ErrorText'
import { ForgotPasswordProp } from 'types/auth'

type ForgotPasswordFormProps = {
  onSubmit: (data: ForgotPasswordProp) => void
  forgotPasswordError: boolean
}

export const ForgotPasswordForm = ({
  onSubmit,
  forgotPasswordError
}: ForgotPasswordFormProps) => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={onSubmit}
    validationSchema={forgotPasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          name="email"
          component={TextInputField}
          placeholder={$t('auth.enterEmail')}
        />
        <ErrorText
          error={!!forgotPasswordError}
          message={$t('auth.emailDoesNotExist')}
        />
        <Button onPress={handleSubmit}>{$t('auth.sendEmail')}</Button>
      </View>
    )}
  </Formik>
)
