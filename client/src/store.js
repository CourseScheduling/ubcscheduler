import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {FETCH_COURSELIST, ADD_COURSE, TOGGLE_COURSE_TERM} from './actions/types'

import schedule from './js/scheduler'

const initialState = {};

/** Scheduling middleware to automatically schedule when: 
 *   ADD_COURSE, LOCK_SECTION, ADD_BREAK, MODIFY_COURSE
 */
const scheduler = (store) => (next) => (action) => {
  let state = store.getState()
  let courses;
  switch (action.type) {
    case ADD_COURSE:
      courses = [...state.course.courses]
      let idx = state.course.courses.findIndex(element => {
        return element.code === action.payload.code
      });
      if (idx === -1) {
        courses.push(action.payload)
        action.schedules = schedule(courses, state.scheduler.breaks, state.scheduler.lockedSections)
      }
      break;    
    case TOGGLE_COURSE_TERM: 
      courses = [...state.course.courses]
      courses.forEach(e => {
        if (e.code === action.payload.code) {
          e.term = action.payload.term
        }
      })
      action.schedules = schedule(courses, state.scheduler.breaks, state.scheduler.lockedSections)
      break;
    default:
      console.log("Not scheduling for ", action.type)
  }

  next(action)
}

const middleware = [thunk, scheduler];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
