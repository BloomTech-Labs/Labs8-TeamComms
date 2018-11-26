import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import { loadInitialDataSocket } from "../../actions/index";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import("./css.css");

let socket;

class socketClient extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      ///
      color: "white",

      text: "",

      textValue: "",
      chats: []
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

    socket.on("update text", text => {
      this.setState({ text: text });
    });

    // socket.on("chat message");
  }

  // updates state and sends new state to server to distribute to clients with emit
  changeHandler = e => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    socket.emit("update text", e.target.value); //sends data to server
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

  renderHeader() {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold" />
        <button className="ql-italic" aria-label="Italic" />
        <button className="ql-underline" aria-label="Underline" />
      </span>
    );
  }

  render() {
    // testing for socket connections
    // const header = this.renderHeader();

    return (
      <div>
        <Editor
          style={{ height: "320px" }}
          value={this.state.text}
          onTextChange={e =>
            this.setState({ text: e.htmlValue }, e => {
              socket.emit("update text", this.state.text);
            })
          }
        />

        {/* <textarea value={this.state.textValue} onChange={this.changeHandler} cols={40} name="textValue" rows={10} /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(socketClient);

