import React, { Component } from "react";
import "./convoList.css";
import dummyData from "./dummyData";

class ConvoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: dummyData
    };
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
  card(convo) {
    return (
      <div className="card">
        <h1>{convo.title}</h1>
        <button className="custom-btn">Edit</button>
        <button className="custom-btn">Delete</button>
        <p>{convo.description}</p>
      </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="list">
          {this.state.conversations.length === 0
            ? this.empty()
            : this.state.conversations.map(convo => {
                // Will replace this with a Card component
                return this.card(convo);
              })}
        </div>
      </React.Fragment>
    );
  }
}

export default ConvoList;
