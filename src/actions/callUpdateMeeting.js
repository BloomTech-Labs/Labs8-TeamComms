import axios from "axios";
import { MEETING_UPDATE_CALLED, MEETING_UPDATE_RETURNED } from "./types";

export const callUpdateMeeting = (e, header, body, history, dashboard, id) => {
  e.preventDefault();
  console.log("id: ", id);
  const promise = axios.put(
    `https://teamcomm2.herokuapp.com/api/meeting/update/${id}`,
    body,
    { headers: header }
  );

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
          history.push(`/meeting/${res.data["_id"]}`);
        }
      })
      .catch(err => console.log(err));
  };
};
