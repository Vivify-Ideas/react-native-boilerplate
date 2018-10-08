import { SET_VALIDATION_ERRORS } from './ActionTypes';

export const setValidationErrors = (payload) => {
  return {
    type: SET_VALIDATION_ERRORS,
    payload
  };
};