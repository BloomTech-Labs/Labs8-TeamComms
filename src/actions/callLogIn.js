import axios from "axios";
import {
  LOGIN_CALLED,
  LOGIN_RETURNED,
  LOGIN_ERROR,
  TOGGLE_OVERPANE
} from "./types";
// import history from '../history';

export const callLogIn = (e, userInput, history, overpane) => {
  e.preventDefault();
  const credentials = {
    email: userInput.email,
    password: userInput.password
  };

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.post(`${server}/api/users/login`, credentials);

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
        dispatch({ type: LOGIN_ERROR });
        history.push("/landing");
      });
  };
};
