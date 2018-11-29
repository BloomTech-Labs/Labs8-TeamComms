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
import { Panel } from "primereact/panel";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import { InputText } from "primereact/inputtext";
import { SubmitButton } from "../Common";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import("./css.css");

let socket;
let questionList = [];

const StyledInputText = styled(InputText)`
  width: 70%;
  height: 35px;
`;

const QuestionButton = styled(SubmitButton)`
  font-size: 12px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1024px;
  margin: 0 auto;
`;

const StyledListAttendees = styled(ListBox)`
  &&& {
    width: 100%;
    margin-bottom: 20px;
    border: none;
  }
`;

const StyledListQuestions = styled(ListBox)`
  &&& {
    width: 100%;
    border: none;
  }
`;

const Title = styled.h1`
  color: white;
  font-size: 30px;
  padding-bottom: 16px;
`;

const EditorWrapper = styled.div`
  @media (min-width 300px) {
    color: black;

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
  }
`;

const Editor = styled(ReactQuill)`
  background: white;
  .ql-container {
    height: 300px;
  }
`;
const MeetingDetails = styled.div`
  display:flex;
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

const QuestionForm = styled.form`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const CustomTabs = styled(TabPanel)`
  &&&&&&&&&&&&&&&&&&&&&&&&& {
    background-color: black;
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
      users: [
        { name: "Buddy Wackit" },
        { name: "DeeDee Reynolds" },
        { name: "Dennis Reynolds" },
        { name: "Mac" }
      ],
      currentQuestion: "",
      questions: [
        { name: "what are we doing?" },
        { name: "What is our meeting?" },
        { name: "what color should we make it?" },
        { name: "size? shape?" },
        { name: "size? dude seriously?" },
        { name: "what are we doing?" },
        { name: "What is our meeting?" },
        { name: "what color should we make it?" },
        { name: "size? shape?" },
        { name: "size? dude seriously?" }
      ]
    };

    // const socket_connect = function(room) {
    //   return io("localhost:8080/meeting", {
    //     query: "r_var=" + room
    //   });
    // };

    const socket_connect = function(room) {
      return io("https://teamcomm2.herokuapp.com/meeting", {
        query: "r_var=" + room
      });
    };

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
    console.log(this.state.questions);
    const id = this.props.match.params.id;
    let title;
    let description;
    const attendeeList = [];
    this.props.meetings.map((meeting, index) => {
      if (meeting._id == id) {
        title = meeting.title;
        description = meeting.description;

        const a = meeting.invitees.map(attendee => {
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
          <div />
        </MeetingDetails>
        <TabView>
          <CustomTabs header="Attendees">
            <Panel header="Invited">
              <StyledListAttendees
                options={this.state.users}
                optionLabel="name"
                filter={true}
              />
            </Panel>
            <Panel header="Current">
              <StyledListAttendees
                options={this.state.users}
                optionLabel="name"
                filter={true}
              />
            </Panel>
          </CustomTabs>
          <CustomTabs headerClassName={this.props.className} header="Questions">
            <ScrollPanel style={{ width: "100%", height: "150px" }}>
              <StyledListQuestions
                options={this.state.questions}
                optionLabel="name"
              />
            </ScrollPanel>
            <QuestionForm onSubmit={this.sendQuestion}>
              <StyledInputText
                value={this.state.currentQuestion}
                onChange={e =>
                  this.setState({ currentQuestion: e.target.value })
                }
              />
              <QuestionButton onClick={this.sendQuestion}>
                Add A Question
              </QuestionButton>
            </QuestionForm>
          </CustomTabs>
          <CustomTabs
            headerClassName={this.props.className}
            header="Meeting Notes"
          >
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
          </CustomTabs>
        </TabView>
      </Main>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Meeting);
