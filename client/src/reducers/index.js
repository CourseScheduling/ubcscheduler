import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import scheduleReducer from './scheduleReducer';

export default combineReducers({
    course: courseReducer,
    schedule: scheduleReducer
  });