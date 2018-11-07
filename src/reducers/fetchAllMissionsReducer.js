
//below 2 lines, boilerplate
import { initialState } from './index';

import {
    FETCH_MISSIONS_CALLED, 
    FETCH_MISSIONS_RETURNED, 
    SERVER_ERROR
} from '../actions/types';


export const fetchAllMissionsReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_MISSIONS_CALLED:
            return Object.assign({}, state, {
                fetchingMissions: true
            })

        case FETCH_MISSIONS_RETURNED:
            return { ...state, fetchingMissions: false, missions: action.payload }

        case SERVER_ERROR:
            return { ...state, error: action.payload }


        default:
            return state;
    }
}
