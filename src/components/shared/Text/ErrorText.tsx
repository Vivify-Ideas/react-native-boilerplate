import React from 'react'
import { Text } from 'react-native'

type ErrorTextProps = {
  error: boolean
  message: string
}

const ErrorText = ({ error, message }: ErrorTextProps) => {
  return <Text>{error ? message : ''}</Text>
}

export default ErrorText
