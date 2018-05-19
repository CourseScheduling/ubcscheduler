import { FETCH_COURSELIST } from '../actions/types';

export const fetchCourselist = () => dispatch => {
    console.log("Fetching courselist")
    fetch('/api/v1/courselist')
    .then(res => res.json())
    .then(courselist => {            
            dispatch({
                type: FETCH_COURSELIST,
                payload: courselist.list
            })
        }        
    )
};