import { SCHEDULE } from '../actions/types';
import store from '../store';

export const schedule = () => dispatch => {
    console.log("Scheduling")
    console.log(store)
};