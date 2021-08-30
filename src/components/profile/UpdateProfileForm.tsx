import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Formik, Field } from 'formik';
import { View, Text } from 'native-base';
import $t from 'i18n';
import { updateProfileValidationRules } from 'validation/profile';
import { TextInputField } from '../shared/FormFields';

type UpdateProfileFormProps = {
  user?: { firstName: string; lastName: string };
  onSubmit: (userData: object) => void;
};

export const UpdateProfileForm = ({
  user,
  onSubmit,
}: UpdateProfileFormProps) => (
  <Formik
    initialValues={{
      firstName: user?.firstName,
      lastName: user?.lastName,
    }}
    onSubmit={onSubmit}
    validationSchema={updateProfileValidationRules}
  >
    {({ handleSubmit }) => (
      <View>
        <Field
          style={styles.formInput}
          name="firstName"
          component={TextInputField}
          placeholder={$t('profile.updateUser.firstName')}
        />
        <Field
          style={styles.formInput}
          name="lastName"
          component={TextInputField}
          placeholder={$t('profile.updateUser.lastName')}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text>{$t('profile.updateUser.update')}</Text>
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
