import { SET_FONTS_LOADED } from '../actions/ActionTypes';

const initState = {fontsLoaded: false};

const fontsLoadedReducer = (state = initState, action) => {
  switch (action.type) {
  case SET_FONTS_LOADED:
    return {...state, fontsLoaded: true};
  default:
    return state;
  }
};

export default fontsLoadedReducer;
