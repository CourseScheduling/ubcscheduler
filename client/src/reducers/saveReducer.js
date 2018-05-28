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
    let errorMsg, newSaves;
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
            state.saves.push(save)
            let saveString = JSON.stringify(state.saves)
            
            window.localStorage.setItem('saves', saveString)
            newSaves = JSON.parse(saveString)

            return {
                saves: newSaves,
                nextId: getNextId(newSaves)
            }
        case LOAD_SCHEDULE:
            newSaves = [...state.saves]
            newSaves.forEach(save => save.selected = false)
            //TODO:: Might have to search by id then set to true
            action.payload.selected = true;
            return {
                ...state,
                saves: newSaves,
            };
        default:
            return state;
    }

}
