import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import SCREENS from 'constants/screens';

let _navigator: NavigationContainerRef | null;

export const setTopLevelNavigator = (navigatorRef: NavigationContainerRef | null): void => {
  _navigator = navigatorRef;
};

export const navigate = (routeName: string, params?: object): void => {
  if (_navigator && routeName) {
    _navigator.navigate(routeName, params);
  }
};

export const goBack = (): void => {
  if (_navigator) {
    _navigator.goBack();
  }
};

const reset = (): void => {
  if (!_navigator) {
    return;
  }

  _navigator.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: SCREENS.MAIN_STACK.HOME_STACK }],
    })
  );
};

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
  reset,
};
