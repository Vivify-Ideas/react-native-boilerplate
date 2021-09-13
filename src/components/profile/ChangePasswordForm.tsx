import React from 'react'
import { View, Button } from 'native-base'
import { Formik, Field } from 'formik'

import $t from 'i18n'
import { changePasswordValidationRules } from 'validation/profile'
import { TextInputField } from '../shared/FormFields'
import ErrorText from '../shared/Text/ErrorText'

type PasswordData = {
  current_password: string
  new_password: string
  new_password_confirmation: string
}

type ChangePasswordFormProps = {
  onSubmit: (passwordData: PasswordData) => void
  invalidOldPasswordError: boolean
}

export const ChangePasswordForm = ({
  onSubmit,
  invalidOldPasswordError
}: ChangePasswordFormProps) => (
  <Formik
    initialValues={{
      current_password: '',
      new_password: '',
      new_password_confirmation: ''
    }}
    onSubmit={onSubmit}
    validationSchema={changePasswordValidationRules}
  >
    {({ handleSubmit }) => {
      return (
        <View>
          <Field
            name="current_password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('profile.changePassword.currentPassword')}
          />
          <ErrorText
            error={!!invalidOldPasswordError}
            message={$t('profile.changePassword.invalidOldPassword')}
          />
          <Field
            name="new_password"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('profile.changePassword.newPassword')}
          />
          <Field
            name="new_password_confirmation"
            component={TextInputField}
            secureTextEntry
            placeholder={$t('profile.changePassword.confirmNewPassword')}
          />
          <Button onPress={handleSubmit}>
            {$t('profile.changePassword.change')}
          </Button>
        </View>
      )
    }}
  </Formik>
)
