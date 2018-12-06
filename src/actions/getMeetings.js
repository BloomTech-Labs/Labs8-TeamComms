import axios from "axios";
import { GET_MEETING_CALLED, GET_MEETING_RETURNED } from "./types";

export const getMeetings = () => {
  const header = { Authorization: localStorage.getItem("jwt") };
  const promise = axios.get(
    "http://localhost:8080/api/meeting/retrieve",
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
  };
};
