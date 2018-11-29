import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";
import { loadInitialDataSocket } from "../../actions/index";
// import { Editor } from "primereact/editor";
import { ListBox } from "primereact/listbox";
import { Checkbox } from "primereact/checkbox";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { SubmitButton } from "../Common";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import("./css.css");

let socket;
let questionList = [];

const StyledInputText = styled(InputText)`
  width: 250px;
`;

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

const Title = styled.h1`
  color: white;
  font-size: 30px;
  padding-bottom: 16px;
`;

const EditorWrapper = styled.div`
  grid-column: 2;
  grid-row: 1/4;
  color: black;
  margin-left: 30px;

  label {
    color: white;
    padding-left: 5px;
  }
  strong {
    font-weight: bold !important;
  }
  em {
    font-style: italic !important;
  }
`;

const Editor = styled(ReactQuill)`
  background: white;
  .ql-container {
    height: 300px;
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
  }
`;

class Meeting extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = {
      ///
      color: "white",
      user: "JAshcraft",
      text: "",
      users: [],
      currentQuestion: "",
      questions: []
    };

    const socket_connect = function(room) {
      return io("localhost:8080/meeting", {
        query: "r_var=" + room
      });
    };

    // const socket_connect = function(room) {
    //   return io("https://teamcomm2.herokuapp.com/meeting", {
    //     query: "r_var=" + room
    //   });
    // };

    const id = this.props.match.params.id;
    console.log("meeting id", id);
    socket = socket_connect(id);
    socket.emit(
      "update-users",
      this.props.userData.user.displayName
        // ? this.props.userData.user.displayName
        // : this.state.user
    );

    //open initial socket connection on deployed server

    //uncomment below to activate heroku socket
    // socket = io.connect("https://teamcomm2.herokuapp.com:8080");
    //dispatch socket to redux(not doing anything yet)
    // dispatch(loadInitialDataSocket(socket));

    //socket.on is the receiver, this updates the text from the server.

    // socket.on("chat message");
  }

  componentDidMount() {
    socket.on("update text", text => {
      this.setState({ text: text });
    });
    socket.emit(
      "update-users",
      this.props.userData.user.displayName
        // ? this.props.userData.user.displayName
        // : this.state.user
    );
    socket.on("update-users", users => {
      socket.users = users;
      this.setState({ users });
    });
    // socket.emit("meeting-init",(users,questions) => {

    // })
    socket.on("question", questions => {
      return this.setState({ questions });
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleChange = value => {
    let status = "";
    if (value.length !== this.state.text.length) {
      console.log("I am Emitting");
      socket.emit("update text", value);
      status = "Changes not saved.";
    }
    this.setState({ text: value, savedStatus: status });
  };

  // updates state and sends new state to server to distribute to clients with emit
  changeHandler = html => {
    this.setState({
      text: html
    });
    socket.emit("update text", this.state.text); //sends data to server
  };

  sendQuestion = e => {
    e.preventDefault();
    socket.emit("question", this.state.currentQuestion);
  };

  render() {
    console.log(this.state.questions)
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
    console.log("ATT LIST", attendeeList);

    // const questionList = [];
    // let q = this.props.questions.map(question => {
    //   let name = question.name;
    //   return questionList.push({ name: name });
    // });

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
          options={this.state.questions}
          optionLabel="question"
          filter={true}
        />

        <StyledListAttendees
          options={this.state.users ? this.state.users : attendeeList}
          optionLabel="displayName"
          filter={true}
        />
        <form onSubmit={this.sendQuestion}>
          <StyledInputText
            value={this.state.currentQuestion}
            onChange={e => this.setState({ currentQuestion: e.target.value })}
          />
          <SubmitButton onClick={this.sendQuestion}>
            Add A Question
          </SubmitButton>
        </form>
        <EditorWrapper>
          <Title>Meeting Notes</Title>

          <Editor
            theme="snow"
            value={this.state.text}
            onChange={this.handleChange}
            name="text"
          />

          <div style={{ display: "inline-block", marginLeft: "20px" }}>
            <Checkbox inputId="youtube" value="Upload to Youtube" />
            <label htmlFor="youtube">Upload to Youtube</label>
          </div>

          <div style={{ display: "inline-block", marginLeft: "20px" }}>
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
