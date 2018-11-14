import axios from "axios";
import { GOOGLE_LOGIN_CALLED, GOOGLE_LOGIN_RETURNED } from "./types";
// import history from '../history';

export const callGoogleLogIn = (history, token) => {
  console.log("logging in with google");
  console.log("token", token);
  let bearerToken = "Bearer " + token;
  localStorage.setItem("jwt", bearerToken);
  console.log("bearer token", bearerToken);
  // const headers = { Authorization: `${bearerToken}` };
  // // const headers = { "Content-Type": "application/json", "Authorization" : `${token}`};
  // const promise = axios.get("https://teamcomm2.herokuapp.com/api/users/login", {
  //   headers

  // });

  // return function(dispatch) {
  //   dispatch({ type: GOOGLE_LOGIN_CALLED });
  //   promise
  //     .then(res => {
  //       console.log("GOOGLE RESPONSE: ", res);
  //       dispatch({ type: GOOGLE_LOGIN_RETURNED, payload: res.data });
  //       // localStorage.setItem("jwt", res.data.token);
  //       history.push("/dashboard");
  //     })
  //     .catch(err => console.log({ "Axios-Error": err }));
  // };
};
