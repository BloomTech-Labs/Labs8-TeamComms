import { TOGGLE_OVERPANE } from "./types";

export const toggleOverpane = value => {
  return function(dispatch) {
    dispatch({ type: TOGGLE_OVERPANE, payload: value });
  };
};
