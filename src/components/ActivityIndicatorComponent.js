import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const ActivityIndicatorComponent = ({ animating, transparent = false }) => {
  return (
    <ActivityIndicator
      style={[styles.loading, !transparent && styles.bgColor]}
      animating={animating}
      size="large"
    />
  );
};
export default ActivityIndicatorComponent;

const backgroundColor = '#141316';
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bgColor: {
    backgroundColor
  }
});
