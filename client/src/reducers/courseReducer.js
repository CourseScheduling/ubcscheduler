import { FETCH_COURSELIST, ADD_COURSE, REMOVE_COURSE, TOGGLE_COURSE_TERM, UPDATE_ACTIVE_SECTIONS } from '../actions/types';

const initialState = {
  courselist: [],
  courses: []
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
      console.log("newCourses", newCourses)
      return {
        ...state,
        courses: newCourses
      }
    case TOGGLE_COURSE_TERM:
      newCourses = [...state.courses]
      newCourses.forEach(e => {
        if (e.code === action.payload.code) {
          e.term = action.payload.term
        }
      })
      return {
        ...state,
        courses: newCourses
      }
    case UPDATE_ACTIVE_SECTIONS:
      // ANTI-PATTERN: mutating sections
      console.log("courseRecuer - update active sections: ", action)
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
    default:
      return state;
  }
}
