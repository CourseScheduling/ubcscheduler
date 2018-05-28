import { SAVE_SCHEDULE, LOAD_SCHEDULE} from '../actions/types'

import schedule from './scheduler'

const saveMiddleware = (store) => (next) => (action) => {
    let state = store.getState()
    switch (action.type) {
      case SAVE_SCHEDULE:
        let save = {
            courses: state.course.courses,
            index: state.scheduler.index,
            term: state.scheduler.term,
            breaks: state.scheduler.breaks,
            lockedSections: state.scheduler.lockedSections,
            customNumber: state.scheduler.customNumber,
            id: state.save.nextId
        }
        console.log("Save middleware", save)
        action.payload = save
        break; 
      default:
        break;
    }
  
    next(action)
  }

export default saveMiddleware