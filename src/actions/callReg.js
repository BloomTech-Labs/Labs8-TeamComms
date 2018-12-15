import axios from "axios";
import {
  REG_CALLED,
  REG_RETURNED,
  REG_ERROR,
  REG_ERROR_UNKNOWN
} from "./types";
// import history from "../history";

export const callReg = (e, credentials, history, stripeToken) => {
  console.log("credentials", credentials);
  if (stripeToken) {
    credentials.token = stripeToken.token;
    console.log("with token", credentials);
  }
  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.post(`${server}/api/users/register`, credentials);

  return function(dispatch) {
    dispatch({
      type: REG_CALLED
    });
    promise
      .then(res => {
        dispatch({
          type: REG_RETURNED,
          payload: res.data
        });
        localStorage.setItem("jwt", res.data.token);

        history.push("/dashboard");
      })
      .catch(err => {
        console.log(err);

        if (err.message === "Check credentials") {
          dispatch({ type: REG_ERROR });
        } else {
          dispatch({ type: REG_ERROR_UNKNOWN });
          alert("Unknown error. Please check your connection and try again.");
          history.push("/landing");
        }
      });
  };
};
