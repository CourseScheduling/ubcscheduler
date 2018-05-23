import { SCHEDULE, ADD_COURSE } from '../actions/types';

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