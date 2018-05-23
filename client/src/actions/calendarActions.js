import { JUMP_TO, UPDATE_ACTIVE_SECTIONS } from '../actions/types';

export const jumpTo = (idx) => dispatch => {
    console.log("Jumpto action fired")
    dispatch({
        type: JUMP_TO,
        payload: idx
    })
}

export const updateActiveSections = (prevSections, nextSections) => dispatch => {
    console.log("updating active sections")
    dispatch({
        type: UPDATE_ACTIVE_SECTIONS,
        prevSections:  prevSections,
        nextSections: nextSections
    })
}