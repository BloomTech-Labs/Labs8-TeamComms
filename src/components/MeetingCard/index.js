import history from "../../history";
import { connect } from "react-redux";
import React, { Component } from "react";
import "./convoList.css";
import { callDeleteMeeting } from "../../actions/index";
import styled from "styled-components";
import {
  EditButton,
  DeleteButton
  // ShareButton,
  // FavoriteButton,
} from "../Common";
import moment from "moment";

import { Link } from "react-router-dom";

const Description = styled.p`
  color: grey;
`;

const HumanDate = styled.p`
  color: grey;
`;

class MeetingCard extends Component {
  render() {
    const humanDate = moment(this.props.meeting.start_time).format("llll");
    const header = { Authorization: localStorage.getItem("jwt") };

    return (
      <div className="card">
        <div
          style={{
            borderRight: "1px solid lightgrey",
            paddingRight: "7px",
            paddingLeft: "7px"
          }}
        >
          <Link to={`/updateMeeting/${this.props.meeting._id}`}>
            <EditButton>
              <i className="fas fa-edit fa-fw fa-md" />
            </EditButton>
          </Link>
          <DeleteButton
            onClick={e => {
              if (
                window.confirm(
                  "Are you sure you want to delete this item? Cannot be undone."
                )
              ) {
                this.props.callDeleteMeeting(
                  e,
                  header,
                  this.props.meeting._id,
                  history
                );
              }
            }}
          >
            <i className="fas fa-trash fa-fw fa-md" />
          </DeleteButton>
          {/* <ShareButton>
            <i className="fas fa-share" />
          </ShareButton>
          <FavoriteButton>
            <i className="fas fa-star" />
          </FavoriteButton> */}
        </div>
        <div
          style={{
            borderRight: "1px solid lightgrey",
            paddingRight: "7px",
            paddingLeft: "7px"
          }}
        >
          <HumanDate>
            {humanDate}
            &nbsp;
          </HumanDate>
        </div>
        <div
          style={{
            borderRight: "1px solid lightgrey",
            paddingRight: "7px",
            paddingLeft: "7px"
          }}
        >
          <Link to={`/meeting/${this.props.meeting._id}`}>
            <h1>{this.props.meeting.title}</h1>
          </Link>
        </div>
        <div
          style={{
            borderRight: "1px solid lightgrey",
            paddingRight: "7px",
            paddingLeft: "7px"
          }}
        >
          <Description>&nbsp; {this.props.meeting.description}</Description>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { callDeleteMeeting }
)(MeetingCard);
