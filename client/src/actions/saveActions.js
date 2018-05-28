import { SAVE_SCHEDULE, LOAD_SCHEDULE } from '../actions/types';

export const loadSchedule = (save) => dispatch => {
    dispatch({
        type: LOAD_SCHEDULE,
        payload: save
    })
}

export const saveSchedule = () => dispatch => {
    dispatch({
        type: SAVE_SCHEDULE,
    })
}