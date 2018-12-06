import { TOGGLE_MOBILE_MENU } from "./types";

export const toggleMobileMenu = value => {
  return function(dispatch) {
    dispatch({ type: TOGGLE_MOBILE_MENU, payload: value });
  };
};
