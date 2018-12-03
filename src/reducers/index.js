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
  UPDATE_RETURNED,
  CREATE_MEETING_CALLED,
  CREATE_MEETING_RETURNED,
  GET_MEETING_CALLED,
  GET_MEETING_RETURNED,
  MEETING_UPDATE_CALLED,
  MEETING_UPDATE_RETURNED
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
    case CREATE_MEETING_CALLED:
      return {
        ...state
      };
    case CREATE_MEETING_RETURNED:
      return {
        ...state,
        meetings: [...state.meetings, action.payload]
      };
    case GET_MEETING_CALLED:
      return {
        ...state
      };
    case GET_MEETING_RETURNED:
      return {
        ...state,
        meetings: action.payload
      };
    case MEETING_UPDATE_CALLED:
      return {
        ...state
      };
    case MEETING_UPDATE_RETURNED:
      return {
        ...state,
        meetings: [...state.meetings, action.payload]
      };
    default:
      return state;
  }
};
