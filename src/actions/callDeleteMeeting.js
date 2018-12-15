import axios from "axios";
import { DELETE_MEETING_CALLED, DELETE_MEETING_RETURNED } from "./types";

export const callDeleteMeeting = (e, header, id, history) => {
  e.preventDefault();

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.delete(`${server}/api/meeting/delete/${id}`, {
    headers: header
  });

  return function(dispatch) {
    dispatch({
      type: DELETE_MEETING_CALLED
    });
    promise.then(res => {
      dispatch({
        type: DELETE_MEETING_RETURNED,
        payload: res.data
      });
    });
  };
};
