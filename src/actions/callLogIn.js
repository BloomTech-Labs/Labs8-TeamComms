import axios from "axios";
import {
  LOGIN_CALLED,
  LOGIN_RETURNED,
  LOGIN_ERROR,
  TOGGLE_OVERPANE
} from "./types";
// import history from '../history';

export const callLogIn = (e, userInput, history, overpane) => {
  console.log("history", history);
  e.preventDefault();
  const credentials = {
    email: userInput.email,
    password: userInput.password
  };

  const promise = axios.post(
    "https://teamcomm2.herokuapp.com/api/users/login",
    credentials
  );

  return function(dispatch) {
    dispatch({ type: LOGIN_CALLED });
    promise
      .then(res => {
        dispatch({ type: LOGIN_RETURNED, payload: res.data });

        localStorage.setItem("jwt", res.data.token);
        dispatch({ type: TOGGLE_OVERPANE, payload: overpane });
        history.push("/dashboard");
      })
      .catch(err => {
        console.log({ "Axios-Error": err });
        dispatch({ type: LOGIN_ERROR });
      });
  };
};
