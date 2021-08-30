import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View, Text } from 'native-base';
import { Formik, Field } from 'formik';

import $t from 'i18n';
import { changePasswordValidationRules } from 'validation/profile';
import { TextInputField } from '../shared/FormFields';
import ErrorText from '../shared/Text/ErrorText';

type ChangePasswordFormProps = {
  onSubmit: (passwordData: object) => void;
  invalidOldPasswordError: boolean;
};

export const ChangePasswordForm = ({
  onSubmit,
  invalidOldPasswordError,
}: ChangePasswordFormProps) => (
  <Formik
    initialValues={{
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
    }}
    onSubmit={onSubmit}
    validationSchema={changePasswordValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          style={styles.formInput}
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
          style={styles.formInput}
          name="new_password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('profile.changePassword.newPassword')}
        />
        <Field
          style={styles.formInput}
          name="new_password_confirmation"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('profile.changePassword.confirmNewPassword')}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{$t('profile.changePassword.change')}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);
const styles = StyleSheet.create({
  formInput: {
    backgroundColor: '#fff',
  },
});
