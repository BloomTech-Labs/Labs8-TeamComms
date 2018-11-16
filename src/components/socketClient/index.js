import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { loadInitialDataSocket } from "../../actions/index";
import("./css.css");

let socket;
let blueButton;

class socketClient extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      ///
      color: "white",
      textValue: ""
      ///
    };
    //open initial socket connection on local
    //uncomment below to activate local host socket
    socket = io.connect("http://localhost:8080");
    //open initial socket connection on deployed server

    //uncomment below to activate heroku socket
    // socket = io.connect("https://teamcomm2.herokuapp.com:8080");
    console.dir(socket);
    //dispatch socket to redux(not doing anything yet)
    dispatch(loadInitialDataSocket(socket));

    //socket.on is the receiver, this updates the text from the server.
    socket.on("update text", text => {
      this.setState({ textValue: text });
    });
  }

  // updates state and sends new state to server to distribute to clients with emit
  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    socket.emit("update text", e.target.value); //sends data to server
  };

  render() {
    // testing for socket connections

    return (
      <div style={{ textAlign: "center" }}>
        <textarea
          value={this.state.textValue}
          onChange={this.changeHandler}
          cols={40}
          name="textValue"
          rows={10}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(socketClient);
