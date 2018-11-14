import axios from "axios";
import { LOGOUT_CALLED } from "./types";

const callLogOut = history => {
  return function(dispatch) {
    dispatch({ type: LOGOUT_CALLED });
    localStorage.clear();
    history.push("/landing");
  };
};

export default callLogOut;
