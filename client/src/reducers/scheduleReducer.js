import { ADD_COURSE, TOGGLE_COURSE_TERM, JUMP_TO, REMOVE_COURSE, TOGGLE_TERM, UPDATE_BREAKS } from '../actions/types';

const initialState = {
    schedules: {t1:[[]], t2:[[]]},
    index: {t1: 0, t2: 0},
    term: "t1",
    breaks: {
        "t1": [0,0,0,0,0],
        "t2": [0,0,0,0,0]
    }
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
            console.log("Update breaks in scheduler reducer")
            let newBreaks = {
                ...state.breaks
            }
            newBreaks[action.payload.term] = action.payload.breakArr
            return {
                ...state,
                breaks: newBreaks
            }
        default:
            return state
    }
}