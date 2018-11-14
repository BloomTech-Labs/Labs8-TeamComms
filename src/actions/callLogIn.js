
import axios from "axios";
import { LOGIN_CALLED, LOGIN_RETURNED } from "./types";
import history from '../history';


export const callLogIn = (e, userInput) => {
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
    dispatch({ type: LOGIN_CALLED });
    promise
      .then(res => {
        dispatch({
          type: LOGIN_RETURNED,
          payload: res.data
        });
        console.log("RESPONSE: ", res);
        localStorage.setItem("jwt", res.data.token);
        history.push('/conversations');
        window.location.reload();
      })
      .catch(err =>
        console.log({'Axios-Error': err})
      );
  };
};
