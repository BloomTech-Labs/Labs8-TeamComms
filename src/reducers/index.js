
import { 
    REG_CALLED, 
    REG_RETURNED, 
    LOGIN_CALLED, 
    LOGIN_RETURNED
} from '../actions/types';


export const reducer = (state = null, action) => {
    switch (action.type) {

        case REG_CALLED:
            return {...state, 
                registrationCalled: true
            }
        case REG_RETURNED:
            return {...state, 
                registrationSuccess: true, 
                userData: action.payload
            }

        case LOGIN_CALLED:
            return {...state, 
            loginCalled: true
        }
        case LOGIN_RETURNED:
        return {...state, 
            loginSuccess: true, 
            userData: action.payload
        }

        default:
            return state;
    }
}