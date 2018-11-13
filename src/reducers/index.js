
import { 
    REG_CALLED, 
    REG_RETURNED, 
    SIGNIN_CALLED, 
    SIGNIN_RETURNED
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

        case SIGNIN_CALLED:
            return {...state, 
            signinCalled: true
        }
        case SIGNIN_RETURNED:
        return {...state, 
            signInSuccess: true, 
            userData: action.payload
        }

        default:
            return state;
    }
}