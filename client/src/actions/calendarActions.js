import { JUMP_TO } from '../actions/types';

export const jumpTo = (idx) => dispatch => {
    console.log("Jumpto action fired")
    dispatch({
        type: JUMP_TO,
        payload: idx
    })
}