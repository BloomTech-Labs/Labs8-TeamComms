import axios from "axios";
import { GOOGLE_LOGIN_CALLED, GOOGLE_LOGIN_RETURNED } from "./types";
// import history from "../history";

export const callGoogleLogIn = (history, token) => {
  let bearerToken = `Bearer ${token}`;
  const headers = { Authorization: bearerToken };

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.get(`${server}/api/users/retrieve`, {
    headers
  });

  return function(dispatch) {
    dispatch({ type: GOOGLE_LOGIN_CALLED });
    promise
      .then(res => {
        localStorage.setItem("jwt", bearerToken);
        dispatch({ type: GOOGLE_LOGIN_RETURNED, payload: res.data });
        history.push("/dashboard");
        window.location.reload();
      })
      .catch(err => {
        console.log({ "Axios-Error": err });
      });
  };
};
