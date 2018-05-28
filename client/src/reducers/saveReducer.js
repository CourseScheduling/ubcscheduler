import { SAVE_SCHEDULE, LOAD_SCHEDULE } from '../actions/types';
import swal from 'sweetalert2'

const initialState = {
    saves: [],
    nextId: 1
};

function getNextId(saves) {
    let nextId = 1;
    while(saves.find(save => save.id === nextId)) {
        nextId++
    }

    return nextId
}

export default function (state = initialState, action) {
    let errorMsg;
    switch (action.type) {
        case SAVE_SCHEDULE:
            let save = action.payload
            if (save.courses.length === 0) {
                errorMsg = "No courses to save..."
                swal({
                    title: errorMsg,
                    type: 'error',
                    timer: 1000,
                    showConfirmButton: false
                })
                return state;
            }
            let saveString = JSON.stringify(save)
            // TODO:: Put to localstorage
            let newSave = JSON.parse(saveString)
            let newSaves = [...state.saves]
            newSaves.push(newSave)
            return {
                saves: newSaves,
                nextId: getNextId(newSaves)
            }
        default:
            return state;
    }

}
