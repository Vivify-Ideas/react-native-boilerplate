import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import { View, Text } from 'native-base';
import $t from 'i18n';
import { forgotPasswordValidationRules } from 'validation/auth';
import { TextInputField } from '../shared/FormFields';
import ErrorText from '../shared/Text/ErrorText';

type ForgotPasswordFormProps = {
  onSubmit: (data: any) => void;
  forgotPasswordError: boolean;
};

export const ForgotPasswordForm = ({
  onSubmit,
  forgotPasswordError,
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
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{$t('auth.sendEmail')}</Text>
        </TouchableOpacity>
      </View>
    )}
  </Formik>
);
