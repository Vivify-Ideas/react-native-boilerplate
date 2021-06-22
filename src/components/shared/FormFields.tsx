import React from 'react';
import { TextInput, View, Text } from 'react-native';

import { ErrorMessage, FieldProps } from 'formik';

export const TextInputField = ({ field, form, ...props }: FieldProps) => {
  return (
    <View>
      <TextInput
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        {...props}
      />
      <ErrorMessage name={field.name} component={Text} />
    </View>
  );
};
