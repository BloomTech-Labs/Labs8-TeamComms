import axios from "axios";
import { UPDATE_CALLED, UPDATE_RETURNED } from "./types";

export const callUpdate = (e, userData, history) => {
  e.preventDefault();
  const header = { Authorization: localStorage.getItem("jwt") };

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.put(`${server}/api/users/update`, userData, {
    headers: header
  });

  return function(dispatch) {
    dispatch({
      type: UPDATE_CALLED
    });
    promise
      .then(res => {
        dispatch({
          type: UPDATE_RETURNED,
          payload: res.data
        });
        alert("User Preferences Updated");
      })
      .catch(err =>
        console.log({
          "Axios-Error": err
        })
      );
  };
};
