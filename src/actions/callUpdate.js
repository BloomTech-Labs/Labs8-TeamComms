import axios from "axios";
import { UPDATE_CALLED, UPDATE_RETURNED } from "./types";

export const callUpdate = (e, userData, history) => {
  e.preventDefault();

  const promise = axios.put(
    "https://teamcomm2.herokuapp.com/api/users/update",
    userData
  );

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
        console.log("Updated Info", res.data);
      })
      .catch(err =>
        console.log({
          "Axios-Error": err.data
        })
      );
  };
};
