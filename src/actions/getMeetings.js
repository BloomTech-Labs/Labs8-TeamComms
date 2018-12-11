import axios from "axios";
import {
  GET_MEETING_CALLED,
  GET_MEETING_RETURNED,
  GET_MEETING_ERROR
} from "./types";
import history from "../history";

export const getMeetings = () => {
  const header = { Authorization: localStorage.getItem("jwt") };
  const promise = axios.get(
    "https://teamcomm2.herokuapp.com/api/meeting/retrieve",
    { headers: header }
  );

  return function(dispatch) {
    dispatch({
      type: GET_MEETING_CALLED
    });
    promise
      .then(res => {
        console.log(res);
        dispatch({
          type: GET_MEETING_RETURNED,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
    dispatch({ type: GET_MEETING_ERROR });
  };
};
