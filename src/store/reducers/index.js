import { combineReducers } from 'redux';
import activeUserReducer from './ActiveUserReducer';
import fontsLoadedReducer from './FontsLoadedReducer';
import validationErrorsReducer from './ValidationErrorsReducer';

export default combineReducers({
  activeUser: activeUserReducer,
  validationErrors: validationErrorsReducer,
  fontsLoaded: fontsLoadedReducer,
});
