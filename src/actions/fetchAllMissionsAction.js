import axios from 'axios';

import {
    FETCH_MISSIONS_CALLED, 
    FETCH_MISSIONS_RETURNED, 
    SERVER_ERROR
} from './types';


const urlApiGet = 'http://localhost:3333/api/notes';

export const fetchAllMissions = () => {
    const promise = axios.get(urlApiGet);
    return function(dispatch) {
        dispatch({ 
            type: FETCH_MISSIONS_CALLED 
        });
        promise
            .then(response => {
                dispatch({
                    type: FETCH_MISSIONS_RETURNED,
                    payload: response.data
                });
            })
            .catch(error => {
                dispatch({
                    type: SERVER_ERROR,
                    payload: ['ERROR from AXIOS', error]
                });
            });
    }
}