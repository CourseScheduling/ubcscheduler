import { SCHEDULE, ADD_COURSE, TOGGLE_COURSE_TERM } from '../actions/types';

const initialState = {
    schedules: {t1:[[]], t2:[[]]},
    index: {t1: 0, t2: 0},
    breaks: {
        "t1": [0,0,0,0,0],
        "t2": [0,0,0,0,0]
    }
}


//TODO: Add break, lock section
export default function(state = initialState, action) {
    switch (action.type) {
        case SCHEDULE:
            return {
                ...state,
                schedules : action.payload
            };
        case ADD_COURSE:
        case TOGGLE_COURSE_TERM:
            console.log("ADD COURSE!")
            return {
                ...state,
                schedules: action.schedules,
                index: {t1: 0, t2: 0}
            }
        default:
            return state
    }
}