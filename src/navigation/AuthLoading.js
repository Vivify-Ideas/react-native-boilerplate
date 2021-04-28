import SCREENS from 'constants/screens';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { UserContext } from '../contexts/UserContext';

const AuthLoadingScreen = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);
  const [stackRender, setStackRender] = useState(null);

  useEffect(() => {
    bootstrapAsync();
  }, []);

  useEffect(
    () => {
      if (isLoading || (isLoading && !user?.id)) {
        return;
      }

      if (user?.id) {
        setStackRender(SCREENS.MAIN_STACK.INDEX);
      } else {
        setStackRender(SCREENS.AUTH_STACK.INDEX);
      }
    },
    [user?.id, isLoading]
  );

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

AuthLoadingScreen.propTypes = {
  children: PropTypes.func
};

export default AuthLoadingScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },

  loading: {
    marginTop: 30
  }
});
