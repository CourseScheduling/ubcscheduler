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
    let newState;
    switch (action.type) {
        case ADD_COURSE:
        case REMOVE_COURSE:
        case TOGGLE_COURSE_TERM:
            newState = {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0}
            }
            break;
        case JUMP_TO:
            let newIdx = {...state.index}
            newIdx[state.term] = action.payload
            newState = {
                ...state,
                index: newIdx
            }
            break;
        case TOGGLE_TERM:
            newState = {
                ...state,
                term: action.payload
            }
            break;
        case UPDATE_BREAKS:
            //Preprocessed in middleware
            newState = {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0},
                breaks: action.newBreaks
            }
            break;
        case TOGGLE_LOCK:
            // Preprocessed in middleware
            
            newState = {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0},
                lockedSections : action.newLockedSections,
            }
            break;
        default:
            newState = state
            break;
    }
    if (newState.schedules.t1.length === 0 || newState.schedules.t2.length === 0) {
        console.log("No schedules found!")
        return state
    } else {
        return newState
    }
}