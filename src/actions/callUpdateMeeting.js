import axios from "axios";
import { MEETING_UPDATE_CALLED, MEETING_UPDATE_RETURNED } from "./types";

export const callUpdateMeeting = (e, header, body, history, dashboard, id) => {
  e.preventDefault();

  const local = "http://localhost:8080";
  const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

  const promise = axios.put(`${server}/api/meeting/update/${id}`, body, {
    headers: header
  });

  return function(dispatch) {
    dispatch({
      type: MEETING_UPDATE_CALLED
    });
    promise
      .then(res => {
        dispatch({
          type: MEETING_UPDATE_RETURNED,
          payload: res.data
        });
        if (dashboard === true) {
          history.push("/dashboard");
        } else {
          history.push(`/meeting/${id}`);
        }
      })
      .catch(err => console.log(err));
  };
};
