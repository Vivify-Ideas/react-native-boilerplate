import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';

import SCREENS from 'constants/screens';
import { UserContext } from 'contexts/UserContext';

type AuthLoadingScreenProps = {
  children: ({ isAuthenticated }: { isAuthenticated: boolean }) => React.ReactNode;
};

type StackRendersValues = 'MainStack' | 'AuthStack' | null;

const AuthLoadingScreen = ({ children }: AuthLoadingScreenProps) => {
  const { user, isLoading } = useContext(UserContext);
  const [stackRender, setStackRender] = useState<StackRendersValues>(null);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  useEffect(() => {
    if (user?.id && !isLoading) {
      setStackRender(SCREENS.MAIN_STACK.INDEX);
    } else if (!user?.id && !isLoading) {
      setStackRender(SCREENS.AUTH_STACK.INDEX);
    }
  }, [user?.id, isLoading]);

  // Fetch the token from storage then navigate to our appropriate place
  const bootstrapAsync = async () => {
    if (isLoading || (isLoading && !user?.id)) {
      return;
    }

    if (!user?.id) {
      setStackRender(SCREENS.AUTH_STACK.INDEX);
    }

    // This will switch to the Main screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  return stackRender ? (
    <>{children({ isAuthenticated: stackRender !== SCREENS.AUTH_STACK.INDEX })}</>
  ) : (
    <View>
      <ActivityIndicator style={styles.loading} />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },

  loading: {
    marginTop: 30,
  },
});
