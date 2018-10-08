import { NavigationActions } from 'react-navigation';

let _navigator;

export const setTopLevelNavigator = navigatorRef => {
  _navigator = navigatorRef;
};

// function navigate(routeName, params) {
//   _navigator.dispatch(
//     NavigationActions.navigate({
//       routeName,
//       params,
//     })
//   );
// }

export const navigate = (routeName, params) => {
  if (_navigator && routeName) {
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }
};

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator
};
