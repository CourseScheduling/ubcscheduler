import {FETCH_COURSELIST, ADD_COURSE, REMOVE_COURSE, TOGGLE_COURSE_TERM, UPDATE_BREAKS, TOGGLE_LOCK} from '../actions/types'

import schedule from './scheduler'

/** Scheduling middleware to automatically schedule when: 
 *   ADD_COURSE, LOCK_SECTION, ADD_BREAK, MODIFY_COURSE
 */
const schedulerMiddleware = (store) => (next) => (action) => {
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
      case REMOVE_COURSE:
        courses = [...state.course.courses].filter(course => course.code !== action.payload)
        action.schedules = schedule(courses, state.scheduler.breaks, state.scheduler.lockedSections)
        break;
      case TOGGLE_COURSE_TERM: 
        courses = [...state.course.courses]
        courses.forEach(e => {
          if (e.code === action.payload.code) {
            e.term = action.payload.term
          }
        })
        action.schedules = schedule(courses, state.scheduler.breaks, state.scheduler.lockedSections)
        action.newCourses = courses
        break;
      case UPDATE_BREAKS:
        courses = [...state.course.courses]
        let newBreaks = {
            ...state.scheduler.breaks
        }
        newBreaks[action.payload.term] = action.payload.breakArr
        action.schedules = schedule(state.course.courses, newBreaks, state.scheduler.lockedSections)
        action.newBreaks = newBreaks
        break;
      case TOGGLE_LOCK:
        let newLockedSections;
        if (state.scheduler.lockedSections.includes(action.payload)) {
            // Unlock
            newLockedSections = state.scheduler.lockedSections.filter(s => s !== action.payload)
        } else {
            // Lock
            newLockedSections = [...state.scheduler.lockedSections]
            newLockedSections.push(action.payload)
        }
        action.newLockedSections = newLockedSections
        action.schedules = schedule(state.course.courses, state.scheduler.breaks, newLockedSections)
      default:
        console.log("Not scheduling for ", action.type)
    }
  
    next(action)
  }

export default schedulerMiddleware