import { SET_ACTIVE_USER } from './ActionTypes';

export const setActiveUser = (payload) => {
  return {
    type: SET_ACTIVE_USER,
    payload
  };
};