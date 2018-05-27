import { combineReducers } from 'redux';
import courseReducer from './courseReducer';
import scheduleReducer from './scheduleReducer';
import sidepanelReducer from './sidepanelReducer';

export default combineReducers({
    course: courseReducer,
    scheduler: scheduleReducer,
    sidepanel: sidepanelReducer
  });