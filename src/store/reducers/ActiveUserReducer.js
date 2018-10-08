import { SET_ACTIVE_USER } from '../actions/ActionTypes';

const activeUserReducer = (state = null, action) => {
  switch (action.type) {
  case SET_ACTIVE_USER:
    return state ? {...state, ...action.payload} : action.payload;
  default:
    return state;
  }
};

export default activeUserReducer;