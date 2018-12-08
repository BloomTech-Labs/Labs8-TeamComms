import React, { Component, Fragment } from "react";
import "./convoList.css";
import { connect } from "react-redux";
import { getMeetings, callDeleteMeeting } from "../../actions/index";
import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";
import { SpinnerWrapper } from "../Common";
import { callGoogleLogIn } from "../../actions/callGoogleLogIn";
import { Link } from "react-router-dom";
import MeetingCard from "../MeetingCard";
import history from "../../history";

const AddButton = styled.button`
  width: 100%;
  height: 70vh;
  color: #ffffff;
  background: #ffffff;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 0;
  margin-left: 0;
  i {
    color: #f0f0f0;
    background: none;
  }
`;
const ButtonNavLink = styled(Link)`
  width: 100%
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  padding-left: 0;
  margin-left: 0;
`;

class MeetingList extends Component {
  componentDidMount() {
    if (this.props.token && !localStorage.getItem("jwt")) {
      this.props.callGoogleLogIn(history, this.props.token);
    } else {
      this.props.getMeetings();
    }
  }

  empty() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <ButtonNavLink to={"/createmeeting"}>
          <AddButton>
            <i className="fas fa-plus-square fa-10x" />
          </AddButton>
        </ButtonNavLink>
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
  { getMeetings, callDeleteMeeting, callGoogleLogIn }
)(MeetingList);
