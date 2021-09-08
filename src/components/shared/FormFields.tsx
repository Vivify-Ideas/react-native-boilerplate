import React from 'react'
import { View, Text, Input } from 'native-base'
import { ErrorMessage, FieldProps } from 'formik'

export const TextInputField = ({ field, form, ...props }: FieldProps) => {
  return (
    <View>
      <Input
        autoCapitalize="none"
        value={field.value}
        onChangeText={form.handleChange(field.name)}
        onBlur={form.handleBlur(field.name)}
        {...props}
      />
      <ErrorMessage name={field.name} component={Text} />
    </View>
  )
}
