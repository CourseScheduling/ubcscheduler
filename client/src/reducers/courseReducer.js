import { FETCH_COURSELIST, ADD_COURSE, REMOVE_COURSE, TOGGLE_COURSE_TERM, UPDATE_ACTIVE_SECTIONS, TOGGLE_COURSE, ADD_TEMP, REMOVE_TEMP } from '../actions/types';

const initialState = {
  courselist: [],
  courses: [],
  tempSection: {}
};


export default function (state = initialState, action) {
  let newCourses;
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

      newCourses = [...state.courses]
      newCourses.forEach(course => course.active = false)
      newCourses.push(action.payload)

      return {
        ...state,
        courses: newCourses
      }
    case REMOVE_COURSE:
      newCourses = [...state.courses].filter(course => course.code !== action.payload);
      return {
        ...state,
        courses: newCourses
      }
    case TOGGLE_COURSE_TERM:
      // Preprocessed in middleware
      return {
        ...state,
        courses: action.newCourses
      }
    case TOGGLE_COURSE:
      // ANTI-PATTERN: mutating course.active
        let isActive = action.payload.active ? false : true
        action.payload.active = isActive
      return {
        ...state,
        courses: [...state.courses]
      }
    case UPDATE_ACTIVE_SECTIONS:
      // ANTI-PATTERN: mutating sections
      action.prevSections.forEach(section => {
        section.active = false
      })
      action.nextSections.forEach(section => {
        section.active = true
      })
      return {
        ...state,
        courses: [...state.courses]
      }
    case ADD_TEMP:
      return {
        ...state,
        tempSection: action.payload
      }
    case REMOVE_TEMP:
      return {
        ...state,
        tempSection: {}
      }
    default:
      return state;
  }
}
