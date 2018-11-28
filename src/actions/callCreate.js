import axios from "axios";
import { CREATE_MEETING_CALLED, CREATE_MEETING_RETURNED } from "./types";

export const callCreate = (e, header, body, history) => {
  e.preventDefault();

  const promise = axios.post(
    "https://teamcomm2.herokuapp.com/api/convo/create",
    body,
    { headers: header }
  );

  return function(dispatch) {
    dispatch({
      type: CREATE_MEETING_CALLED
    });
    promise
      .then(res => {
        console.log(res);
        dispatch({
          type: CREATE_MEETING_RETURNED,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};
