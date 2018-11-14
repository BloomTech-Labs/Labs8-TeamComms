import axios from "axios";
import { GOOGLE_LOGIN_CALLED } from "./types";
// import history from '../history';

export const callGoogleLogIn = (e, history) => {
  e.preventDefault();
  console.log("logging in with google");
  const promise = axios.get("https://teamcomm2.herokuapp.com/api/auth/google");

  return function(dispatch) {
    dispatch({ type: GOOGLE_LOGIN_CALLED });
    promise
      .then(res => {
        console.log("GOOGLE RESPONSE: ", res);
        // localStorage.setItem("jwt", res.data.token);
        // history.push("/dashboard");
        // window.location.reload();
      })
      .catch(err => console.log({ "Axios-Error": err }));
  };
};
