import { Field, Formik } from 'formik';
import $t from 'i18n';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { signUpValidationRules } from '../../validation/auth';
import { TextInputField } from '../shared/FormFields';
import ErrorText from '../shared/Text/ErrorText';

export const SignUpForm = ({ onSubmit, signUpErrors }) => (
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
        <Field name="last_name" component={TextInputField} placeholder={$t('auth.enterLastName')} />
        <Field name="email" component={TextInputField} placeholder={$t('auth.enterEmail')} />
        <ErrorText error={!!signUpErrors?.email} message={signUpErrors?.email} />
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
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{$t('auth.signUp')}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
  signUpErrors: PropTypes.object
};
