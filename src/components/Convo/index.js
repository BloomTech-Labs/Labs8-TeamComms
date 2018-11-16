import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import io from 'socket.io-client';

const socket = io('http://localhost:3300/sockets');

class Convo extends Component { 
  render() {
    const id = this.props.match.params.id;
    let title;
    let description;
    this.props.conversations.map((convo, index) => {
      if (id == convo.id) {        
          title = convo.title;
          description = convo.description;        
      }
      return (title && description);
    });
    return(
      
      <Fragment>        
        <h1 style={{ color: "white" }}>convo page</h1>
        <h1 style={{ color: "white" }}>Title: {title}</h1>
        <p style={{ color: "white" }}>Description: <br/>{description}</p>
        <div style={{width: "500px", height: "500px", border: "1px solid red"}}>sockets placeholder</div>
      </Fragment>
    )
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Convo);
