import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {FETCH_COURSELIST, ADD_COURSE, SCHEDULE} from './actions/types'

import schedule from './scheduler'

const initialState = {};

/** Scheduling middleware to automatically schedule when: 
 *   ADD_COURSE, LOCK_SECTION, ADD_BREAK, MODIFY_COURSE
 */
const scheduler = (store) => (next) => (action) => {
  let state = store.getState()
  if (action.type === ADD_COURSE) {
    console.log("Add course detected in middleware")
    let courses = [...state.course.courses]
    let idx = state.course.courses.findIndex(element => {
      return element.code === action.payload.code
    });
    if (idx === -1) {
      courses.push(action.payload)
      action.schedules = schedule(courses, state.scheduler.breaks, state.scheduler.lockedSections)
    }    
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
