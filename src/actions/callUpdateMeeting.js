import axios from "axios";
import { UPDATE_MEETING_CALLED, UPDATE_MEETING_RETURNED } from "./types";

export const callCreate = (e, header, body, history, dashboard) => {
  e.preventDefault();

  const promise = axios.post(
    "https://teamcomm2.herokuapp.com/api/meeting/update",
    body,
    { headers: header }
  );

  return function(dispatch) {
    dispatch({
      type: UPDATE_MEETING_CALLED
    });
    promise
      .then(res => {
        console.log(res);
        dispatch({
          type: UPDATE_MEETING_RETURNED,
          payload: res.data
        });
        if (dashboard === true) {
          history.push("/dashboard");
        } else {
          history.push(`/meeting/${res.data["_id"]}`);
        }
      })
      .catch(err => console.log(err));
  };
};
