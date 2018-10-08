import { EDIT_PROFILE } from './ActionTypes';

export const updateProfile = (payload) => {
  return {
    type: EDIT_PROFILE,
    payload
  };
};