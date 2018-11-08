
import { combineReducers } from 'redux';

import  { appMounted }  from './appMountedReducer';
import { reduxTest } from './reduxTestReducer';


const rootReducer =  combineReducers({
    appMounted, 
    reduxTest
})
export default rootReducer;

