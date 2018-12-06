import { PREMIUM_CHANGE } from "./types";

export const premiumChange = () => {
  return function(dispatch) {
    dispatch({ type: PREMIUM_CHANGE, payload: true });
  };
};
