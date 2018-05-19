import { FETCH_COURSELIST } from '../actions/types';

const initialState = {
    courselist: [],
};


export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_COURSELIST:
        return {
          ...state,
          courselist: action.payload
        };
      default:
        return state;
    }
  }
  