import axios from "axios";
import {
  REG_CALLED,
  REG_RETURNED,
  REG_ERROR,
  REG_ERROR_UNKNOWN
} from "./types";
// import history from "../history";

export const callReg = (e, credentials, history, premium = false) => {
  e.preventDefault();

  const promise = axios.post(
    "http://localhost:8080/api/users/register",
    credentials
  );

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
        console.log("hist", history);
        history.push("/dashboard");
      })
      .catch(err => {
        console.log({
          "Axios-Error": err
        });
        console.log(err);
        if (err.message === "Check credentials") {
          dispatch({ type: REG_ERROR });
        } else {
          dispatch({ type: REG_ERROR_UNKNOWN });
          alert("Unknown error. Please check your connection and try again.");
          history.push("/register");
        }
      });
  };
};
