import axios from "axios";
import { GOOGLE_LOGIN_CALLED, GOOGLE_LOGIN_RETURNED } from "./types";
// import history from "../history";

export const callGoogleLogIn = (history, token) => {
  let bearerToken = `Bearer ${token}`;
  const headers = { Authorization: bearerToken };

  const promise = axios.get(
    "https://teamcomm2.herokuapp.com/api/users/retrieve",
    {
      headers
    }
  );

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
        history.push("/login");
      });
  };
};
