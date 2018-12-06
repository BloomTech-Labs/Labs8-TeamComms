import history from "../../history";
import { connect } from "react-redux";
import React, { Component } from "react";
import "./convoList.css";
import { getMeetings, callDeleteMeeting } from "../../actions/index";
import styled from "styled-components";
import { ProgressSpinner } from "primereact/progressspinner";
import {
  EditButton,
  DeleteButton,
  ShareButton,
  FavoriteButton,
  SpinnerWrapper
} from "../Common";

import { Link } from "react-router-dom";

const Description = styled.p`
  color: lightgrey;
`;

class MeetingCard extends Component {
  render() {
    const header = { Authorization: localStorage.getItem("jwt") };

    return (
      <div className="card">
        <div>
          <Link to={`/updateMeeting/${this.props.meeting._id}`}>
            <EditButton>
              <i className="fas fa-edit" />
            </EditButton>
          </Link>
          <DeleteButton
            onClick={e => {
              this.props.callDeleteMeeting(
                e,
                header,
                this.props.meeting._id,
                history
              );
            }}
          >
            <i className="fas fa-trash" />
          </DeleteButton>
          {/* <ShareButton>
            <i className="fas fa-share" />
          </ShareButton>
          <FavoriteButton>
            <i className="fas fa-star" />
          </FavoriteButton> */}
        </div>
        <div>
          <Link to={`/meeting/${this.props.meeting._id}`}>
            <h1>{this.props.meeting.title}</h1>
          </Link>
        </div>
        <div>
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
