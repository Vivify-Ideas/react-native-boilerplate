import { call, put } from 'redux-saga/effects';
import profileService from '../../services/api/ProfileService';
import { setActiveUser } from '../actions/ActiveUserActions';
import { setValidationErrors } from '../actions/ValidationErrorsActions';
import navigationService from '../../services/NavigationService';


export function * editProfile(action) {
  try {
    const response = yield call(profileService.updateProfile, action.payload);
  
    yield put(setActiveUser(response));
  
    yield put(setValidationErrors([]));

    yield call(navigationService.navigate, 'HomeScreen');
  } catch (error) {
    if (error.response && error.response.status === 422) {
      yield put(setValidationErrors(error.response.data));
    }
  }
}