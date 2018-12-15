import axios from "axios";
import {
  GET_MEETING_CALLED,
  GET_MEETING_RETURNED,
  GET_MEETING_ERROR
} from "./types";

export const getMeetings = () => {
  const header = { Authorization: localStorage.getItem("jwt") };

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.get(`${server}/api/meeting/retrieve`, {
    headers: header
  });

  return function(dispatch) {
    dispatch({
      type: GET_MEETING_CALLED
    });
    promise
      .then(res => {
        dispatch({
          type: GET_MEETING_RETURNED,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
    dispatch({ type: GET_MEETING_ERROR });
  };
};
