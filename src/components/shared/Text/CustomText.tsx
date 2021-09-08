import React from 'react'
import { Text, TextStyle } from 'react-native'

const FONT_FAMILY = {
  REGULAR: { fontFamily: 'montserrat-regular' },
  BOLD: { fontFamily: 'montserrat-bold' },
  ITALIC: { fontFamily: 'montserrat-italic' }
}

type CustomTextProps = {
  bold?: boolean
  italic?: boolean
  style?: TextStyle
  children?: React.ReactChild
}

const CustomText = ({ bold, italic, style, children }: CustomTextProps) => {
  const getFontFamily = () => {
    if (bold) {
      return FONT_FAMILY.BOLD
    } else if (italic) {
      return FONT_FAMILY.ITALIC
    } else {
      return FONT_FAMILY.REGULAR
    }
  }

  return <Text style={[getFontFamily(), style]}>{children}</Text>
}

export default CustomText
