import React from 'react'
import PropTypes from 'prop-types'
import { Text, StyleSheet } from 'react-native'

type MonoTextProps = {
  style: Record<string, unknown>
}
const MonoText = (props: MonoTextProps) => (
  <Text {...props} style={[props.style, styles.text]} />
)

MonoText.propTypes = {
  style: PropTypes.object
}

export default MonoText
const styles = StyleSheet.create({
  text: {
    fontFamily: 'space-mono'
  }
})
