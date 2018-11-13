
import axios from "axios";
import { SIGNIN_CALLED, SIGNIN_RETURNED } from "./types";


export const callSignin = (e, userInput) => {
  e.preventDefault();
  const credentials = {
    username: userInput.username,
    password: userInput.password
  };
  const body = JSON.stringify(credentials);
  const headers = {"Content-Type": "application/json"};

  const promise = axios.post
  ("https://teamcomm2.herokuapp.com/api/users/login", body, {headers});

  return function(dispatch) {
    dispatch({ type: SIGNIN_CALLED });
    promise
      .then(res => {
        dispatch({
          type: SIGNIN_RETURNED,
          payload: res.data
        });
        console.log("RESPONSE: ", res);
        localStorage.setItem("jwt", res.data.token);
      })
      .catch(err =>
        console.log({'Axios-Error': err})
      );
  };
};
