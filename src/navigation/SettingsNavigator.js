import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import MainHeader from '../components/shared/headers/MainHeader';
import SCREENS from '../constants/screens';

const StackNavigator = createStackNavigator();

const SettingsStack = ({ navigation }) => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={SCREENS.SETTINGS_STACK.SETTINGS}
        component={() => (
          <View>
            <Text>Settings</Text>
          </View>
        )}
        options={() => MainHeader({ navigation })}
      />
    </StackNavigator.Navigator>
  );
};

SettingsStack.propTypes = {
  navigation: PropTypes.any
};

export default SettingsStack;
