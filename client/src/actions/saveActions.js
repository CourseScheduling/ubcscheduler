import { SAVE_SCHEDULE, LOAD_SCHEDULE, REMOVE_SAVE } from '../actions/types';

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

export const removeSave = (save) => dispatch => {
    dispatch({
        type: REMOVE_SAVE,
        payload: save
    })
}