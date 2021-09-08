import React from 'react'
import { Button, View } from 'native-base'
import { Field, Formik } from 'formik'

import $t from 'i18n'
import { signUpValidationRules } from 'validation/auth'
import { TextInputField } from '../shared/FormFields'
import ErrorText from '../shared/Text/ErrorText'

type SignUpFormData = {
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
}

type SignUpFormProps = {
  onSubmit: (data: SignUpFormData) => void
  signUpErrors: { email: string }
}

export const SignUpForm = ({ onSubmit, signUpErrors }: SignUpFormProps) => (
  <Formik
    initialValues={{
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }}
    onSubmit={onSubmit}
    validationSchema={signUpValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          name="first_name"
          component={TextInputField}
          placeholder={$t('auth.enterFirstName')}
        />
        <Field
          name="last_name"
          component={TextInputField}
          placeholder={$t('auth.enterLastName')}
        />
        <Field
          name="email"
          component={TextInputField}
          placeholder={$t('auth.enterEmail')}
        />
        <ErrorText
          error={!!signUpErrors?.email}
          message={signUpErrors?.email}
        />
        <Field
          name="password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('auth.enterPassword')}
        />
        <Field
          name="confirm_password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('auth.confirmPassword')}
        />
        <Button onPress={handleSubmit}>{$t('auth.signUp')}</Button>
      </View>
    )}
  </Formik>
)
