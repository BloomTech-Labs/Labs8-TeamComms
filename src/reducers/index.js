import {
  REG_CALLED,
  REG_RETURNED,
  LOGIN_CALLED,
  LOGIN_RETURNED,
  LOGOUT_CALLED,
  GOOGLE_LOGIN_CALLED,
  GOOGLE_LOGIN_RETURNED,
  TOGGLE_OVERPANE,
  UPDATE_CALLED,
  UPDATE_RETURNED
} from "../actions/types";

export const reducer = (state = null, action) => {
  switch (action.type) {
    case REG_CALLED:
      return { ...state, registrationCalled: true };
    case REG_RETURNED:
      return {
        ...state,
        registrationSuccess: true,
        loginSuccess: true,
        userData: action.payload
      };

    case LOGIN_CALLED:
      return { ...state, loginCalled: true };
    case LOGIN_RETURNED:
      return { ...state, loginSuccess: true, userData: action.payload };
    case LOGOUT_CALLED:
      return {
        ...state,
        userData: {},
        registrationCalled: false,
        registrationSuccess: false,
        loginCalled: false,
        loginReturned: false,
        loginSuccess: false
      };
    case GOOGLE_LOGIN_CALLED:
      return { ...state, loginCalled: true };
    case GOOGLE_LOGIN_RETURNED:
      return { ...state, loginSuccess: true, userData: action.payload };
    case TOGGLE_OVERPANE:
      return { ...state, overpane: action.payload };
    case UPDATE_CALLED:
      return {
        ...state
      };
    case UPDATE_RETURNED:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};
