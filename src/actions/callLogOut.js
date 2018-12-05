import { LOGOUT_CALLED } from "./types";

export const callLogOut = history => {
  return function(dispatch) {
    dispatch({ type: LOGOUT_CALLED });
    localStorage.clear();
    history.push("/landing");
  };
};
