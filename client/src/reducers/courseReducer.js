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
        let idx = state.courses.findIndex(element => {
          return element.code === action.payload.code
        });
        if (idx !== -1) return state;
        return {
          ...state,
          courses: [...state.courses, action.payload]
        }
      default:
        return state;
    }
  }
  