import React from 'react'
import { Button, View } from 'native-base'
import { Formik, Field } from 'formik'

import $t from 'i18n'
import { signInValidationRules } from 'validation/auth'
import ErrorText from '../shared/Text/ErrorText'
import { TextInputField } from '../shared/FormFields'

type SignInFormData = {
  email: string
  password: string
}

type SignInFormProps = {
  onSubmit: (data: SignInFormData) => void
  signInError: boolean
}

export const SignInForm = ({ onSubmit, signInError }: SignInFormProps) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={onSubmit}
    validationSchema={signInValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          name="email"
          component={TextInputField}
          placeholder={$t('auth.enterEmail')}
        />
        <Field
          name="password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('auth.enterPassword')}
        />
        <ErrorText
          error={!!signInError}
          message={$t('auth.invalidCredentials')}
        />
        <Button onPress={handleSubmit}>{$t('auth.signIn')}</Button>
      </View>
    )}
  </Formik>
)
