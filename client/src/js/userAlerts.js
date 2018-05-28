import { ADD_COURSE, TOGGLE_COURSE_TERM, JUMP_TO, REMOVE_COURSE, TOGGLE_TERM, UPDATE_BREAKS, TOGGLE_LOCK } from '../actions/types';
import swal from 'sweetalert2'

export const alertNoSchedule = (action, newState) => {
    let errorMsg = "No schedules found";
    switch (action.type) {
        case ADD_COURSE:
            errorMsg = `${errorMsg} adding ${action.payload.code} in ${newState.term}`
            break;
        case TOGGLE_COURSE_TERM:
            errorMsg = `${errorMsg} toggling term for ${action.payload.code}`
            break;
        case UPDATE_BREAKS:
            errorMsg = `${errorMsg} adding breaks`
            break;
        case TOGGLE_LOCK:
            errorMsg = `${errorMsg} locking ${action.payload}`
            break;
        default:
            errorMsg = `${errorMsg}`
            break;
    }
    swal({
        title: errorMsg,
        type: 'error',
        timer: 2000,
        showConfirmButton: false
    })
}