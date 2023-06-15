import {
  COMPARER_ADD_SHOW,
  COMPARER_REMOVE_SHOW,
  COMPARER_RESET
} from '../actions/actionTypes';

const initialState = {
  shows: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPARER_ADD_SHOW:
      return {
        ...state,
        shows: state.shows.find((s) => s.id === action.payload.id)
          ? [...state.shows]
          : [...state.shows, action.payload]
      };
    case COMPARER_REMOVE_SHOW:
      return {
        ...state,
        shows: state.shows.filter((s) => s.id !== action.payload)
      };
    case COMPARER_RESET:
      return {
        ...state,
        shows: []
      };
    default:
      return state;
  }
};

export default reducer;
