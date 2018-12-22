import React, { Fragment } from "react";
import Stripe from "../Stripe";
import MeetingDetailWrapper from "../Common/MeetingDetailWrapper";

const MeetingDetailTable = props => {
  return (
    <MeetingDetailWrapper>
      <table className="top-table">
        <caption>
          <h1>Meeting Details</h1>
        </caption>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start Time</th>
            <th>Zoom Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.meeting.title}</td>
            <td>{props.humanDate}</td>
            <td>
              {props.userData.user.premium ? (
                <a
                  href={`${props.meeting.zoom}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {props.meeting.zoom}
                </a>
              ) : (
                <Fragment>
                  <span>
                    Pro Users Only! <Stripe />
                  </span>
                </Fragment>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </MeetingDetailWrapper>
  );
};

export default MeetingDetailTable;
