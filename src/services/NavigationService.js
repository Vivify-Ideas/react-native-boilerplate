let _navigator;

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

export const navigate = (routeName, params) => {
  if (_navigator && routeName) {
    _navigator.current?.navigate(routeName, params);
  }
};

export const goBack = () => {
  if (_navigator) {
    _navigator.back();
  }
};

// add other navigation functions that you need and export them

export default {
  navigate,
  goBack,
  setTopLevelNavigator
};
