import { all, takeLatest } from 'redux-saga/effects';
import { EDIT_PROFILE } from '../actions/ActionTypes';
import { editProfile } from './ProfileSagas'; 

export default function * rootSaga() {
  yield all([
    takeLatest(EDIT_PROFILE, editProfile),

    // add your sagas here
  ]);
}