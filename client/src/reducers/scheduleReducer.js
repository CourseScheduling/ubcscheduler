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

function mergeBreaks(break1, break2) {
    let mergedBreaks = [0,0,0,0,0]
    for (let i = 0; i < 5; i++) {
        mergedBreaks[i] = break1[i] & break2[i]
    }
    return mergedBreaks
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
    console.log("newstate.schedules.t1", newState)
    // if (!newState.schedules) return state
    if (newState.schedules.t1.length === 0 || newState.schedules.t2.length === 0) {
        console.log("No schedules found!")
        // Merge old breaks and newState.breaks to take the less constrained option
        let lessConstrainedBreaks = {}
        lessConstrainedBreaks.t1 = mergeBreaks(state.breaks.t1, newState.breaks.t1)
        lessConstrainedBreaks.t2 = mergeBreaks(state.breaks.t2, newState.breaks.t2)
        return {
            ...state,
            breaks: lessConstrainedBreaks
        }
    } else {
        return newState
    }
}