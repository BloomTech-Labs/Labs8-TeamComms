import { TOGGLE_MOBILE_MENU } from "./types";
import history from "../history";

export const toggleMobileMenu = (value, to) => {
  return function(dispatch) {
    dispatch({ type: TOGGLE_MOBILE_MENU, payload: value });
    if (to) {
      history.push(to);
    }
  };
};
