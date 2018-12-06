import React, { Component, Fragment } from "react";
import "./convoList.css";
import { connect } from "react-redux";
import { getMeetings, callDeleteMeeting } from "../../actions/index";
import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";
import { SpinnerWrapper } from "../Common";

import { Link } from "react-router-dom";
import MeetingCard from "../MeetingCard";

class MeetingList extends Component {
  componentDidMount() {
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

  render() {
    var meetings = this.props.filteredMeetings.map(meeting => {
      return <MeetingCard key={Math.random()} meeting={meeting} />;
    });

    return (
      <Fragment>
        {this.props.meetingsLoading ? (
          <SpinnerWrapper>
            <ProgressSpinner />
          </SpinnerWrapper>
        ) : null}
        <div className="list">
          {this.props.meetings.length === 0 ? this.empty() : meetings}
        </div>
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
