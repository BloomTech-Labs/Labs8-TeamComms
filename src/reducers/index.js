import {
  REG_CALLED,
  REG_RETURNED,
  REG_ERROR,
  LOGIN_CALLED,
  LOGIN_RETURNED,
  LOGIN_ERROR,
  LOGOUT_CALLED,
  GOOGLE_LOGIN_CALLED,
  GOOGLE_LOGIN_RETURNED,
  TOGGLE_OVERPANE,
  TOGGLE_MOBILE_MENU,
  UPDATE_CALLED,
  UPDATE_RETURNED,
  CREATE_MEETING_CALLED,
  CREATE_MEETING_RETURNED,
  GET_MEETING_CALLED,
  GET_MEETING_RETURNED,
  MEETING_UPDATE_CALLED,
  MEETING_UPDATE_RETURNED,
  DELETE_MEETING_CALLED,
  DELETE_MEETING_RETURNED,
  PREMIUM_CHANGE
} from "../actions/types";

export const reducer = (state = null, action) => {
  switch (action.type) {
    case REG_CALLED:
      return { ...state, registrationCalled: true, loginLoading: true };
    case REG_RETURNED:
      return {
        ...state,
        registrationSuccess: true,
        loginSuccess: true,
        userData: action.payload,
        loginLoading: false
      };
    case REG_ERROR:
      return {
        ...state,
        registrationSuccess: false,
        regError: true,
        loginLoading: false
      };

    case LOGIN_CALLED:
      return {
        ...state,
        loginCalled: true,
        loginLoading: true,
        loginError: false
      };
    case LOGIN_RETURNED:
      return {
        ...state,
        loginSuccess: true,
        userData: action.payload,
        loginLoading: false,
        loginError: false
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginSuccess: false,
        loginLoading: false,
        loginError: true
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
        loginLoading: false,
        loginError: false,
        userDataLoading: false,
        meetingsLoading: false
      };
    case GOOGLE_LOGIN_CALLED:
      return { ...state, loginCalled: true, loginLoading: true };
    case GOOGLE_LOGIN_RETURNED:
      return {
        ...state,
        loginSuccess: true,
        userData: action.payload,
        loginLoading: false
      };
    case TOGGLE_OVERPANE:
      return { ...state, overpane: action.payload };
    case TOGGLE_MOBILE_MENU:
      return { ...state, mobileMenu: action.payload };
    case UPDATE_CALLED:
      return {
        ...state,
        userDataLoading: true
      };
    case UPDATE_RETURNED:
      const payload = Object.assign({}, state.userData, action.payload);
      return { ...state, userData: payload, userDataLoading: false };
    case CREATE_MEETING_CALLED:
      return {
        ...state,
        meetingsLoading: true
      };
    case CREATE_MEETING_RETURNED:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
        meetingsLoading: false
      };
    case GET_MEETING_CALLED:
      return {
        ...state,
        meetingsLoading: true
      };
    case GET_MEETING_RETURNED:
      return {
        ...state,
        meetings: action.payload,
        meetingsLoading: false
      };
    case MEETING_UPDATE_CALLED:
      return { ...state, meetingsLoading: true };
    case MEETING_UPDATE_RETURNED:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
        meetingsLoading: false
      };
    case DELETE_MEETING_CALLED:
      return { ...state, meetingsLoading: true };
    case DELETE_MEETING_RETURNED:
      let updatedMeetings = state.meetings.filter(meeting => {
        return meeting._id !== action.payload.id;
      });
      console.log("updated meetings", updatedMeetings);
      return { ...state, meetings: updatedMeetings, meetingsLoading: false };
    // case PREMIUM_CHANGE:
    //   const userData = state.userData;
    //   userData.user.premium = action.payload;
    //   return { ...state, userData: userData };
    case PREMIUM_CHANGE:
      return Object.assign({}, state.userData.user, {
        premium: action.payload
      });
    default:
      return state;
  }
};
