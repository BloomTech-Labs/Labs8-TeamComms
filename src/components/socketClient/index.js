import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { loadInitialDataSocket } from "../../actions/index";
import("./css.css");

let socket;

class socketClient extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      ///
      color: "white",
      textValue: "",
      chats: []
      ///
    };
    //open initial socket connection on local
    //uncomment below to activate local host socket
    socket = io.connect("http://localhost:8080");
    //open initial socket connection on deployed server

    //uncomment below to activate heroku socket
    // socket = io.connect("https://teamcomm2.herokuapp.com:8080");
    //dispatch socket to redux(not doing anything yet)
    // dispatch(loadInitialDataSocket(socket));

    //socket.on is the receiver, this updates the text from the server.

    // socket.on("chat message");
  }

  // updates state and sends new state to server to distribute to clients with emit
  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
     //sends data to server
  };

  onSubmit = e => {
    e.preventDefault();
    socket.emit("update text", this.state.textValue);
    let chats = this.state.chats.slice();
    // chats.push(this.state.textValue);
    // this.setState({ chats });
    socket.on("update text", text => {
      chats.push(text);
      this.setState({ chats, textValue: "" });
    });
  };
  render() {
    // testing for socket connections
    return (
      <div className="game-ctn">
        <div className="game-header">
          Welcome, {this.props.userData.user.displayName}
        </div>
        <div className="text-ctn">
          <div className="text-box">
            {this.state.chats.length
              ? this.state.chats.map(chat => (
                  <div className="chat-msg" key={Math.random()}>
                    {this.props.userData.user.displayName}: {chat}
                  </div>
                ))
              : null}
            <br />
          </div>
        </div>
        <form onSubmit={this.onSubmit} className="input-ctn">
          <input
            autoComplete="off"
            autoCorrect="off"
            spellCheck="off"
            type="text"
            name="textValue"
            value={this.state.textValue}
            onChange={this.changeHandler}
            className="input-box"
          />
          <button
            type="submit"
            className="submit-button"
            onSubmit={this.onSubmit}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(socketClient);
