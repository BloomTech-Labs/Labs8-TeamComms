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
import axios from "axios";

import("./css.css");

let socket;

const AttendeeScroll = styled(ScrollPanel)`
  display: none;
  @media (min-width: 800px) {
    display: block;
    margin: 0 20px;
    }
  }
`;

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
  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const StyledTabView = styled(TabView)`
  width: 100%;
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

const CustomTabs = styled(TabPanel)``;

const AttendeeTab = styled(TabPanel)``;

class Meeting extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.attendeetab = React.createRef();
    this.state = {
      color: "white",
      user: "JAshcraft",
      text: "",
      users: [],
      currentQuestion: "",
      questions: [],
      meeting: {}
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
    socket = socket_connect(id);

    socket.emit("update-users", this.props.userData.user.displayName);

    socket.on("update-users", users => {
      return this.setState({ users });
    });

    socket.on("update text", text => {
      return this.setState({ text });
    });

    socket.on("question", questions => {
      return this.setState({ questions });
    });
  }

  componentDidMount() {
    socket.emit("update-users", this.props.userData.user.displayName);
    let header = { Authorization: localStorage.getItem("jwt") };
    axios
      .get(
        `https://teamcomm2.herokuapp.com/api/meeting/findbyid/${
          this.props.match.params.id
        }`,
        { headers: header }
      )
      .then(res => {
        this.setState({
          meeting: {
            invitees: res.data.invitees,
            title: res.data.title,
            description: res.data.description,
            startTime: res.data.start_time
          }
        });
      });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleChange = value => {
    if (value.length !== this.state.text.length) {
      socket.emit("update text", value);
    }
    this.setState({ text: value });
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
    const id = this.props.match.params.id;
    let title = this.state.meeting.title;
    let description = this.state.meeting.description;

    return (
      <Fragment>
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

        <Main>
          <AttendeeScroll
            ref={this.attendeetab}
            style={{ width: "25%", height: "500px", background: "white" }}
          >
            <Panel header="Invited">
              <StyledListAttendees
                options={this.state.meeting.invitees}
                optionLabel="displayName"
                filter={true}
                className={this.props.className}
              />
            </Panel>
            <Panel header="Current">
              <StyledListAttendees
                options={this.state.users}
                optionLabel="displayName"
                filter={true}
                className={this.props.className}
              />
            </Panel>
          </AttendeeScroll>
          <StyledTabView>
            <AttendeeTab
              className="p-tabview-selected"
              headerClassName={this.props.headerClassName}
              header="Attendees"
            >
              <Panel header="Invited">
                <StyledListAttendees
                  options={this.state.meeting.invitees}
                  optionLabel="displayName"
                  filter={true}
                />
              </Panel>
              <Panel header="Current">
                <StyledListAttendees
                  options={this.state.users}
                  optionLabel="displayName"
                  filter={true}
                />
              </Panel>
            </AttendeeTab>
            <CustomTabs
              headerClassName={this.props.className}
              header="Questions"
            >
              <ScrollPanel
                style={{ width: "100%", height: "150px" }}
                className="custom"
              >
                <StyledListQuestions
                  options={this.state.questions}
                  optionLabel="question"
                  className="custom"
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
          </StyledTabView>
        </Main>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(Meeting);
