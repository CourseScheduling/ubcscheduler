import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import {FETCH_COURSELIST, ADD_COURSE, SCHEDULE} from './actions/types'


const initialState = {};

/** Scheduling middleware to automatically schedule when: 
 *   ADD_COURSE, LOCK_SECTION, ADD_BREAK, 
 */
const scheduler = (store) => (next) => (action) => {
  console.log("action fired", action)
  console.log(store.getState())
  if (action.type === ADD_COURSE) {
    console.log("Add course detected")
    action.schedules = []
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
