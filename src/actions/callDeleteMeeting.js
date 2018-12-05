import axios from "axios";
import { DELETE_MEETING_CALLED, DELETE_MEETING_RETURNED } from "./types";

export const callDeleteMeeting = (e, header, id, history) => {
  e.preventDefault();
  console.log(header);
  const promise = axios.delete(
    `https://teamcomm2.herokuapp.com/api/meeting/delete/${id}`,
    {
      headers: header
    }
  );

  return function(dispatch) {
    dispatch({
      type: DELETE_MEETING_CALLED
    });
    promise
      .then(res => {
        console.log(res);
        dispatch({
          type: DELETE_MEETING_RETURNED,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  };
};
