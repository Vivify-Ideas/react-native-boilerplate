import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Formik, Field } from 'formik';

import $t from 'i18n';
import { signInValidationRules } from 'validation/auth';
import ErrorText from '../shared/Text/ErrorText';
import { TextInputField } from '../shared/FormFields';

type SignInFormProps = {
  onSubmit: (data: any) => void;
  signInError: boolean;
};

export const SignInForm = ({ onSubmit, signInError }: SignInFormProps) => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={onSubmit}
    validationSchema={signInValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field name="email" component={TextInputField} placeholder={$t('auth.enterEmail')} />
        <Field
          name="password"
          component={TextInputField}
          secureTextEntry
          placeholder={$t('auth.enterPassword')}
        />
        <ErrorText error={!!signInError} message={$t('auth.invalidCredentials')} />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{$t('auth.signIn')}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);
