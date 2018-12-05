import React, { Component, Fragment } from "react";
import "./convoList.css";
import { connect } from "react-redux";
import { getMeetings, callDeleteMeeting } from "../../actions/index";
import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";

import {
  EditButton,
  DeleteButton,
  ShareButton,
  FavoriteButton
} from "../Common";

import { Link } from "react-router-dom";

const Description = styled.p`
  color: lightgrey;
`;

class MeetingList extends Component {
  componentWillMount() {
    this.props.getMeetings();
  }
  empty() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h1 style={{ color: "white" }}>Add a new Conversation</h1>
        <button className="custom-btn" style={{ alignSelf: "center" }}>
          NEW
        </button>
      </div>
    );
  }
  // Will break this down into a Card component
  card(meeting) {
    const history = this.props.history;
    const header = { Authorization: localStorage.getItem("jwt") };
    return (
      <div className="card">
        <div>
          <Link to={`/updateMeeting/${meeting._id}`}>
            <EditButton>
              <i className="fas fa-edit" />
            </EditButton>
          </Link>
          <DeleteButton
            onClick={e => {
              this.props.callDeleteMeeting(e, header, meeting._id, history);
            }}
          >
            <i className="fas fa-trash" />
          </DeleteButton>
          <ShareButton>
            <i className="fas fa-share" />
          </ShareButton>
          <FavoriteButton>
            <i className="fas fa-star" />
          </FavoriteButton>
        </div>
        <div>
          <Link to={`/meeting/${meeting._id}`}>
            <h1>{meeting.title}</h1>
          </Link>
        </div>
        <div>
          <Description>
            <p> &nbsp; {meeting.description}</p>
          </Description>
        </div>
      </div>
    );
  }
  render() {
    var meetings = this.props.filteredMeetings.map(meeting => {
      // Will replace this with a Card component
      return this.card(meeting);
    });

    return (
      <Fragment>
        {this.props.loading ? (
          <Fragment>
            <ProgressSpinner />
          </Fragment>
        ) : (
          <div className="list">
            {this.props.meetings.length === 0 ? this.empty() : meetings}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { getMeetings, callDeleteMeeting }
)(MeetingList);
