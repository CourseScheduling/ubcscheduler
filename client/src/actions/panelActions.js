import { FETCH_COURSELIST, ADD_COURSE, REMOVE_COURSE } from '../actions/types';


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

export const addCourse = (courseCode) => dispatch => {
    console.log("Adding course " + courseCode)
    courseCode = courseCode.replace(" ", "_")
    fetch(`/api/v1/course/${courseCode}`)
    .then(res => res.json())
    .then(course => {
        dispatch({
            type: ADD_COURSE,
            payload: course
        })
    })
};

export const removeCourse = (code) => dispatch => {
    console.log("removing coures")
    dispatch({
        type: REMOVE_COURSE,
        payload: code
    })
};