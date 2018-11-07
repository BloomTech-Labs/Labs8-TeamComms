import { combineReducers } from 'redux';

//below 1 line, boilerplate
import { fetchAllMissionsReducer } from './fetchAllMissionsReducer'

export const initialState = {
    missions: [],
    isUserLoggedIn: false,
    saveInProgress: false,
    saved: false,
    fetchingMissions: false,
    displayingAllMissions: false,
}


export default combineReducers({
    //below 1 line, boilerplate
    fetchAllMissionsReducer,
    // ...

})

