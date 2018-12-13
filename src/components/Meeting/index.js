import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";
// import { loadInitialDataSocket } from "../../actions/index";
// import { Editor } from "primereact/editor";
import { ListBox } from "primereact/listbox";
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
import StyledChart from "../Chart/";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import("./css.css");

let socket;

const FinalizeButton = styled(SubmitButton)`
  margin: 20px 0 20px 0;
`;

const AttendeeScroll = styled(ScrollPanel)`
display: flex;
 justify-content: center;
 align-items: center;
 flex-direction: column;
  @media (min-width: 768px) {
   
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
  width: 100%;
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 80%;
    margin: 0 auto;
  }
`;

const StyledTabView = styled(TabView)`
  width: 80%;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledMobileTabView = styled(TabView)`
  width: 100%;
  @media (min-width: 768px) {
    display: none;
  }
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
    white-space: pre-wrap;
    width: 100%;
    border: none;
    overflow-x: hidden;
  }
`;

const ListItem = styled.p`
  white-space: pre-wrap;
  max-width: 100%;
  border: none;
`;
const dimText = styled.p`
  text-align: center;
  color: grey;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

const EditorWrapper = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
  width: 100%;
  .ql-container {
    height: 320px;
    @media (max-width: 500px) {
      height: 20vh;
    }
  }
`;
const MeetingDetails = styled.div`
  display:flex;
  width: 78%;
  margin: 0;
  margin-left: 11.75%;
  justify-content: center;
  align-items: center;
  h1 {
    color: #ffffff;
    font-size: 20px;
  }
  h2 {
    color: #facc43;
    font-size: 20px;
  }
  p {
    color: white;
  }
  }
  @media(max-width:768px) {
    width: 100%;
    margin-left: 0;
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
  width: 80%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

class Meeting extends Component {
  constructor(props) {
    super(props);
    this.meeting = {};
    this.confirm = false;

    this.state = {
      activeIndex: 0,
      color: "white",
      user: "JAshcraft",
      text: "",
      users: [],
      currentQuestion: "",
      questions: [],
      zoom: ""
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

    socket.on("update-users", users => {
      return this.setState({ users });
    });
    socket.on("update text", text => {
      return this.setState({ text });
    });

    socket.on("question", questions => {
      return this.setState({ questions });
    });
    socket.on("finalize", () => {
      alert("Meeting has been saved!");
    });
  }

  componentDidMount() {
    let header = { Authorization: localStorage.getItem("jwt") };
    axios
      .get(
        `https://teamcomm2.herokuapp.com/api/meeting/findbyid/${
          this.props.match.params.id
        }`,
        { headers: header }
      )
      .then(res => {
        this.meeting = {
          _id: res.data._id,
          invitees: res.data.invitees,
          title: res.data.title,
          description: res.data.description,
          startTime: res.data.start_time,
          creatorId: res.data.creatorId._id,
          zoom: res.data.zoom
        };
        if (this.props.userData.user.id === this.meeting.creatorId) {
          this.confirm = true;
        }
        socket.emit("update-users", this.props.userData.user.displayName);
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
    this.setState({ currentQuestion: "" });
  };

  finalizeMeeting = e => {
    e.preventDefault();
    socket.emit("finalize");
  };

  listTemplate(option) {
    return (
      <div className="p-clearfix">
        <ListItem>{option.question}</ListItem>
      </div>
    );
  }

  render() {
    const data = {
      labels: ["attendees", "invitees"],
      datasets: [
        {
          data: [
            this.state.users ? this.state.users.length : 0,
            this.meeting.invitees ? this.meeting.invitees.length : 0
          ],
          backgroundColor: ["#facc43", "#25BEA0"]
          // hoverBackgroundColor: [
          //     "#FF6384",
          //     "#36A2EB",

          // ]
        }
      ]
    };

    const meetingDetails = [
      {
        title: this.meeting.title,
        zoom: this.meeting.zoom,
        startTime: this.meeting.startTime
      }
    ];

    return (
      <Fragment>
        <MeetingDetails>
          <DataTable
            value={meetingDetails}
            responsive={true}
            header="Meeting Details"
          >
            <Column
              field="title"
              header="Title"
              style={{ whiteSpace: "wrap" }}
            />

            <Column field="startTime" header="Start Time" />
            <Column field="zoom" header="Zoom Link" />
          </DataTable>
        </MeetingDetails>

        <Main>
          <AttendeeScroll className="attendee">
            {/* // style=
            {{ width: "25%", height: "500px", background: "white" }} */}
            <StyledChart data={data} />
            <Panel header="Invited" className="invited">
              <StyledListAttendees
                options={this.meeting.invitees}
                optionLabel="displayName"
                filter={true}
                className="invited"
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

          <StyledMobileTabView
            activeIndex={this.state.activeIndex}
            onTabChange={e => this.setState({ activeIndex: e.index })}
          >
            <CustomTabs
              headerClassName={this.props.className}
              header="Questions"
            >
              <ScrollPanel
                style={{ maxWidth: "100%", height: "150px" }}
                className="custom"
              >
                <StyledListQuestions
                  options={this.state.questions}
                  optionLabel="question"
                  className="custom"
                  itemTemplate={this.listTemplate}
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
                <dimText>
                  Collaborate with your team in the notes section below. Any
                  active User can contribute.
                </dimText>
                <Editor
                  theme="snow"
                  value={this.state.text}
                  onChange={this.handleChange}
                  name="text"
                />

                <FinalizeButton>Save</FinalizeButton>
              </EditorWrapper>
            </CustomTabs>
          </StyledMobileTabView>

          <StyledTabView className="tabcustom">
            {/* // activeIndex=
            // {this.state.activeIndex}
            // // onTabChange=
            // {e => this.setState({ activeIndex: e.index })}
            // // renderActiveOnly=
            // {false} */}
            <CustomTabs
              headerClassName={this.props.className}
              header="Questions"
              contentClassName="tabcustom"
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
                <Editor
                  theme="snow"
                  value={this.state.text}
                  onChange={this.handleChange}
                  name="text"
                />

                {this.confirm ? (
                  <FinalizeButton
                    style={{ width: "200px" }}
                    onClick={this.finalizeMeeting}
                  >
                    Save
                  </FinalizeButton>
                ) : (
                  <FinalizeButton
                    style={{ backgroundColor: "gray", width: "200px" }}
                  >
                    Creator Only
                  </FinalizeButton>
                )}
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
