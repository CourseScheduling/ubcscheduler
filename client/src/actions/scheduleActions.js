import { TOGGLE_LOCK } from '../actions/types';

export const toggleLock = (sectionName) => dispatch => {
    console.log("TOGGLE_LOCK action fired", sectionName)
    dispatch({
        type: TOGGLE_LOCK,
        payload: sectionName
    })
}