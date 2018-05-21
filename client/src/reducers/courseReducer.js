import { FETCH_COURSELIST, ADD_COURSE } from '../actions/types';

const initialState = {
    courselist: [],
    courses: []
};


export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_COURSELIST:
        return {
          ...state,
          courselist: action.payload
        };
      case ADD_COURSE:
        return {
          ...state,
          courses: state.courses.push(action.payload)
        }
      default:
        return state;
    }
  }
  