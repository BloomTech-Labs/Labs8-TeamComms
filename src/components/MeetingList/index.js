import React, { Component } from "react";
import "./convoList.css";
import { connect } from "react-redux";
// import dummyData from "./dummyData";
import {
  EditButton,
  DeleteButton,
  ShareButton,
  FavoriteButton
} from "../Common";

import styled from "styled-components";
import { Link } from "react-router-dom";

class MeetingList extends Component {
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
    return (
      <div className="card">
        <Link to={`/meeting/${meeting.id}`}>
          <h1>{meeting.title}</h1>
        </Link>
        <EditButton>
          <i className="fas fa-edit" />
        </EditButton>
        <DeleteButton>
          <i className="fas fa-trash" />
        </DeleteButton>
        <ShareButton>
          <i className="fas fa-share" />
        </ShareButton>
        <FavoriteButton>
          <i className="fas fa-star" />
        </FavoriteButton>

        <p>{meeting.description}</p>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="list">
          {this.props.meetings.length === 0
            ? this.empty()
            : this.props.meetings.map(meeting => {
                // Will replace this with a Card component
                return this.card(meeting);
              })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(MeetingList);
