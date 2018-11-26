import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";
import { loadInitialDataSocket } from "../../actions/index";
import { Editor } from "primereact/editor";
import { ListBox } from "primereact/listbox";
import { Checkbox } from "primereact/checkbox";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { SubmitButton } from "../Common";

import("./css.css");

let socket;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto auto;
  margin: 30px;
`;

const StyledListAttendees = styled(ListBox)`
  grid-column: 1;
  grid-row: 2;

  &&& {
    width: 500px;
    margin-bottom: 20px;
  }
`;

const StyledListQuestions = styled(ListBox)`
  grid-column: 1;
  grid-row: 3;
  &&& {
    width: 500px;
  }
`;

const EditorWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;

  margin-left: 30px;
  h1 {
    color: white;
    font-size: 30px;
    padding-bottom: 16px;
  }
  label {
    color: white;
    padding-left: 5px;
  }
`;
const MeetingDetails = styled.div`
  grid-column: 1;
  grid-row: 1;
  margin: 30px;
  h1 {
    color: orange;
    font-size: 20px;
    padding-top: 16px;
  }
  p {
    color: white;
  }
`;

class Meeting extends Component {
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
    socket = io.connect("http://localhost:3000");
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
    this.setState({
      [e.target.name]: e.target.value
    });
    socket.emit("update text", e.target.value); //sends data to server
  };

  onSubmit = e => {
    e.preventDefault();
    socket.emit("update text", this.state.textValue);
    // socket.on("update text", text => {
    //   chats.push(text);
    //   this.setState({ chats, textValue: "" });
    // });
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
    const id = this.props.match.params.id;
    let title;
    let description;
    const attendeeList = [];
    this.props.meetings.map((meeting, index) => {
      if (meeting.id == id) {
        title = meeting.title;
        description = meeting.description;

        const a = meeting.attendees.map(attendee => {
          let name = attendee;
          return attendeeList.push({ name: name });
        });
      }
    });
    console.log(attendeeList);

    let questionList = [];
    let q = this.props.questions.map(question => {
      let name = question.name;
      return questionList.push({ name: name });
    });

    return (
      <Main>
        <MeetingDetails>
          <h1>Title: {title}</h1>
          <p>
            <br />
            {description}
          </p>
          <h1>Schedule:</h1>
          <p>
            <br />
            Mondays at 8am
          </p>
        </MeetingDetails>

        <StyledListQuestions
          options={questionList}
          optionLabel="name"
          filter={true}
        />
        <StyledListAttendees
          options={attendeeList}
          optionLabel="name"
          filter={true}
        />
        <EditorWrapper>
          <h1>Meeting Notes</h1>
          <Editor
            style={{ height: "320px" }}
            value={this.state.text}
            onTextChange={e =>
              this.setState({ text: e.htmlValue }, e => {
                socket.emit("update text", this.state.text);
              })
            }
          />

          <div style={{ display: "inline-block", marginLeft: "20px" }}>
            <Checkbox inputId="youtube" value="Upload to Youtube" />
            <label htmlFor="youtube">Upload to Youtube</label>
          </div>

          <div
            style={{
              display: "inline-block",
              marginLeft: "20px"
            }}
          >
            <Checkbox inputId="repeat" value="repeat" />
            <label htmlFor="repeat">Schedule a Follow Up Meeting</label>
            <SubmitButton>Finalize Meeting</SubmitButton>
          </div>
        </EditorWrapper>
      </Main>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Meeting);
