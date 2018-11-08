
import { APP_MOUNTED } from '../actions/types';


const initialState = {
    appMounted: false
};

export const appMounted = (state = initialState, action) => {
    switch (action.type) {
        case APP_MOUNTED:
            // return Object.assign({}, state, {
            //     appMounted: true
            // })
            return {...state, appMounted: true}

        default:
            return state;
    }
}
