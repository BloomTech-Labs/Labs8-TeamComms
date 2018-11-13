import React, { Component } from "react";
import "./convoList.css";
import { connect } from "react-redux";
// import dummyData from "./dummyData";
import { EditButton, DeleteButton } from "../Common";

import styled from "styled-components";

class ConvoList extends Component {
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
  card(convo) {
    return (
      <div className="card">
        <h1>{convo.title}</h1>
        <EditButton>
          <i class="fas fa-edit" />
        </EditButton>
        <DeleteButton>
          <i class="fas fa-trash" />
        </DeleteButton>
        <p>{convo.description}</p>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="list">
          {this.props.conversations.length === 0
            ? this.empty()
            : this.props.conversations.map(convo => {
                // Will replace this with a Card component
                return this.card(convo);
              })}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(ConvoList);
