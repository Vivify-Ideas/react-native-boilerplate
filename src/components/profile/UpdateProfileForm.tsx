import React from 'react'
import { Formik, Field } from 'formik'
import { View, Button } from 'native-base'
import $t from 'i18n'
import { updateProfileValidationRules } from 'validation/profile'
import { TextInputField } from '../shared/FormFields'
import { User } from 'types/backend'

type UpdateProfileFormProps = {
  user: Pick<User, 'first_name' | 'last_name'>
  onSubmit: (userData: Pick<User, 'first_name' | 'last_name'>) => void
}

export const UpdateProfileForm = ({
  user,
  onSubmit
}: UpdateProfileFormProps) => (
  <Formik
    initialValues={{
      first_name: user?.first_name || '',
      last_name: user?.last_name || ''
    }}
    onSubmit={onSubmit}
    validationSchema={updateProfileValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          name="first_name"
          component={TextInputField}
          placeholder={$t('profile.updateUser.firstName')}
        />
        <Field
          name="last_name"
          component={TextInputField}
          placeholder={$t('profile.updateUser.lastName')}
        />
        <Button onPress={handleSubmit}>
          {$t('profile.updateUser.update')}
        </Button>
      </View>
    )}
  </Formik>
)
