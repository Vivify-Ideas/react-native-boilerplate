import React from 'react';
import { Button, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SettingsStackNavigationProp,
  SettingsStackParamsList,
  SettingsScreenRouteProp,
  SettingsScreenNavigationProp,
} from 'types/navigation';
import MainHeader from '../components/shared/headers/MainHeader';
import SCREENS from 'constants/screens';

const StackNavigator = createStackNavigator<SettingsStackParamsList>();

type SettingsStackProp = {
  navigation: SettingsStackNavigationProp;
};

type SettingsScreenProp = {
  navigation: SettingsScreenNavigationProp;
  route: SettingsScreenRouteProp;
};

const SettingsStack = ({ navigation }: SettingsStackProp) => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name={SCREENS.SETTINGS_STACK.SETTINGS}
        options={() => MainHeader({ navigation })}
        initialParams={{ userId: 'User1' }}
      >
        {({ navigation, route }: SettingsScreenProp) => {
          const { userId = 'Unknown' } = route.params;
          return (
            <View>
              <Text>Settings {userId}</Text>
              <Button
                title="Navigate to user profile"
                onPress={() => {
                  navigation.navigate(SCREENS.MAIN_STACK.HOME_STACK, {
                    screen: SCREENS.HOME_STACK.HOME,
                  });
                }}
              />
            </View>
          );
        }}
      </StackNavigator.Screen>
    </StackNavigator.Navigator>
  );
};

export default SettingsStack;
