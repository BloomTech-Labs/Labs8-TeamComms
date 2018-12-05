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
  MEETING_UPDATE_RETURNED,
  DELETE_MEETING_CALLED,
  DELETE_MEETING_RETURNED
} from "../actions/types";

export const reducer = (state = null, action) => {
  switch (action.type) {
    case REG_CALLED:
      return { ...state, registrationCalled: true, loading: true };
    case REG_RETURNED:
      return {
        ...state,
        registrationSuccess: true,
        loginSuccess: true,
        userData: action.payload,
        loading: false
      };

    case LOGIN_CALLED:
      return { ...state, loginCalled: true, loading: true };
    case LOGIN_RETURNED:
      return {
        ...state,
        loginSuccess: true,
        userData: action.payload,
        loading: false
      };
    case LOGOUT_CALLED:
      return {
        ...state,
        userData: {},
        registrationCalled: false,
        registrationSuccess: false,
        loginCalled: false,
        loginReturned: false,
        loginSuccess: false,
        loading: false
      };
    case GOOGLE_LOGIN_CALLED:
      return { ...state, loginCalled: true, loading: true };
    case GOOGLE_LOGIN_RETURNED:
      return {
        ...state,
        loginSuccess: true,
        userData: action.payload,
        loading: false
      };
    case TOGGLE_OVERPANE:
      return { ...state, overpane: action.payload };
    case UPDATE_CALLED:
      return {
        ...state,
        loading: true
      };
    case UPDATE_RETURNED:
      return {
        ...state,
        userData: action.payload,
        loading: false
      };
    case CREATE_MEETING_CALLED:
      return {
        ...state,
        loading: true
      };
    case CREATE_MEETING_RETURNED:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
        loading: false
      };
    case GET_MEETING_CALLED:
      return {
        ...state,
        loading: true
      };
    case GET_MEETING_RETURNED:
      return {
        ...state,
        meetings: action.payload,
        loading: false
      };
    case MEETING_UPDATE_CALLED:
      return {
        ...state,
        loading: true
      };
    case MEETING_UPDATE_RETURNED:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
        loading: false
      };
    case DELETE_MEETING_CALLED:
      return {
        ...state,
        loading: true
      };
    case DELETE_MEETING_RETURNED:
      let updatedMeetings = state.meetings.filter(meeting => {
        return meeting._id !== action.payload.id;
      });
      console.log("updated meetings", updatedMeetings);
      return {
        ...state,
        meetings: updatedMeetings,
        loading: false
      };
    default:
      return state;
  }
};
