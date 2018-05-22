import { FETCH_COURSELIST, ADD_COURSE, REMOVE_COURSE } from '../actions/types';

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
      case REMOVE_COURSE:
        let newCourses = [...state.courses].filter(course => course.code !== action.payload);
        console.log("newCourses", newCourses)
        return {
          ...state,
          courses: newCourses
        }
      default:
        return state;
    }
  }
  