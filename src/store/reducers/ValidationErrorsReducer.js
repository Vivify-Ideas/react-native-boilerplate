import { SET_VALIDATION_ERRORS } from '../actions/ActionTypes';

const initialState = {};

const validationErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_VALIDATION_ERRORS:
    return action.payload;
  default:
    return state;
  }
};

export default validationErrorsReducer;