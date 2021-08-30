import React, { useContext, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import { Switch, HStack, Text, useColorMode } from 'native-base';
import { useUserPrefrencesMutation } from 'queries/user';

export const ThemeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { mutate: handleThemeUpdate } = useUserPrefrencesMutation();
  const { user } = useContext(UserContext);

  const [isChecked, setisChecked] = useState<boolean>(false);
  const toggleDarkMode = async () => {
    toggleColorMode();
    const darkMode = isChecked ? false : true;
    handleThemeUpdate({ ...user, darkMode: darkMode });
    setisChecked(darkMode);
  };
  return (
    <HStack space={2} justifyContent="space-between">
      <Text>Dark Mode</Text>
      <Switch
        onToggle={() => {
          toggleDarkMode();
        }}
        isChecked={isChecked}
        colorScheme={'#1e3a8a'}
      />
    </HStack>
  );
};
