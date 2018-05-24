import { ADD_COURSE, TOGGLE_COURSE_TERM, JUMP_TO, REMOVE_COURSE, TOGGLE_TERM, UPDATE_BREAKS, TOGGLE_LOCK } from '../actions/types';

const initialState = {
    schedules: {t1:[[]], t2:[[]]},
    index: {t1: 0, t2: 0},
    term: "t1",
    breaks: {
        "t1": [0,0,0,0,0],
        "t2": [0,0,0,0,0]
    },
    lockedSections: []
}


//TODO: Add break, lock section
export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_COURSE:
        case REMOVE_COURSE:
        case TOGGLE_COURSE_TERM:
            console.log("ADD COURSE!")
            return {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0}
            }
        case JUMP_TO:
            console.log("Jump to action recieved in reducer")
            let newIdx = {...state.index}
            newIdx[state.term] = action.payload
            return {
                ...state,
                index: newIdx
            }
        case TOGGLE_TERM:
            console.log("Toggle term in schedulereducer")
            return {
                ...state,
                term: action.payload
            }
        case UPDATE_BREAKS:
            //Preprocessed in middleware
            console.log("Update breaks in scheduler reducer")
            return {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0},
                breaks: action.newBreaks
            }
        case TOGGLE_LOCK:
            // Preprocessed in middleware
            console.log("locking section")
            
            return {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0},
                lockedSections : action.newLockedSections,
            }
        default:
            return state
    }
}