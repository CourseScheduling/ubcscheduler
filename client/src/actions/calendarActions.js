import { JUMP_TO, UPDATE_ACTIVE_SECTIONS, TOGGLE_TERM, UPDATE_BREAKS } from '../actions/types';

export const jumpTo = (idx) => dispatch => {
    dispatch({
        type: JUMP_TO,
        payload: idx
    })
}

export const updateActiveSections = (prevSections, nextSections) => dispatch => {
    dispatch({
        type: UPDATE_ACTIVE_SECTIONS,
        prevSections:  prevSections,
        nextSections: nextSections
    })
}

export const toggleTerm = (term) => dispatch => {
    dispatch({
        type: TOGGLE_TERM,
        payload: term
    })
}

export const updateBreaks = (breakArr, term) => dispatch => {
    dispatch({
        type: UPDATE_BREAKS,
        payload: {
            breakArr: breakArr,
            term: term
        }
    })
}