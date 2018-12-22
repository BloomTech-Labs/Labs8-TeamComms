import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import io from "socket.io-client";

import { Panel } from "primereact/panel";
import { TabView, TabPanel } from "primereact/tabview";
import { ScrollPanel } from "primereact/scrollpanel";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import StyledScrollPanel from "../Common/StyledScrollPanel";
import { FinalizeButton, SubmitButton } from "../Common/SubmitButton";
import { AttendeeScroll } from "../Common/AttendeeScroll";
import {
  ListItem,
  StyledListAttendees,
  StyledListQuestions
} from "../Common/List";

import Editor from "../Common/Editor";
import QuestionForm from "../Common/QuestionForm";

import axios from "axios";
import StyledChart from "../Chart/";
import moment from "moment";
import MeetingDetailTable from "../MeetingDetailTable";

import "react-quill/dist/quill.snow.css";
import "./meeting.css";

let socket;

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
  background: #ffffff;
  width: 100%;
  margin: 0;
  padding: 0;
  @media (min-width: 768px) {
    flex-direction: row;
    width: 100%;
    margin: 0 auto;
  }
`;

const StyledTabView = styled(TabView)`
  width: 90%;
  margin: 30px;
  margin-left: 0;
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledMobileTabView = styled(TabView)`
  width: 100%;
  margin: 30px;
  @media (min-width: 768px) {
    display: none;
  }
`;

const Dim = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  p {
    text-align: center;
    color: grey;
    line-height: 1.25;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background: #ffffff;
  @media (max-width: 768px) {
    width: 100%;
  }
  p {
    width: 80%;
    color: #00000;
    font-style: italic;
    line-height: 1.25;
  }
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
    const { dispatch } = this.props;

    this.buffer = 0;
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
  }
  componentDidMount() {
    let header = { Authorization: localStorage.getItem("jwt") };
    const local = "http://localhost:8080";
    const server = process.env.REACT_APP_TOML_PRODUCTION_URL || local;

    axios
      .get(`${server}/api/meeting/findbyid/${this.props.match.params.id}`, {
        headers: header
      })
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
        this.confirm = true;
        socket.emit("update-users", this.props.userData.user.displayName);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  handleChange = value => {
    if (value.length !== this.state.text.length) {
      this.buffer++;
      if (this.buffer === 5) {
        socket.emit("update text", value);
        this.buffer = 0;
      }
    }
    this.setState({ text: value });
  };

  sendQuestion = e => {
    e.preventDefault();
    socket.emit("question", this.state.currentQuestion);
    this.setState({ currentQuestion: "" });
  };

  finalizeMeeting = e => {
    e.preventDefault();
    socket.emit("update text", this.state.text)
    socket.emit("finalize");
  };

  listTemplate(option) {
    return (
      <div className="p-clearfix">
        <ListItem>{option.question}</ListItem>
      </div>
    );
  }
  clickZoom() {
    alert();
  }

  render() {
    const humanDate = moment(this.meeting.startTime).format("llll");
    const data = {
      labels: ["attendees", "invitees"],
      datasets: [
        {
          data: [
            this.state.users ? this.state.users.length : 0,
            this.meeting.invitees ? this.meeting.invitees.length : 0
          ],
          backgroundColor: ["#facc43", "#25BEA0"]
        }
      ]
    };

    //auto sets to local times from utc

    return (
      <Fragment>
        <MeetingDetailTable
          meeting={this.meeting}
          humanDate={humanDate}
          {...this.props}
        />

        <Main>
          <AttendeeScroll className="attendee">
            {/* // style=
            {{ width: "25%", height: "500px", background: "white" }} */}
            <StyledChart data={data} />
            <Panel header={`Current Users: ${this.state.users.length}`}>
              <StyledScrollPanel>
                <StyledListAttendees
                  options={this.state.users}
                  optionLabel="displayName"
                  filter={true}
                  className={this.props.className}
                />
              </StyledScrollPanel>
            </Panel>
            <Panel
              header={`Invited Users: ${
                this.meeting.invitees ? this.meeting.invitees.length : 0
              }`}
              className="invited"
            >
              <StyledScrollPanel>
                <StyledListAttendees
                  options={this.meeting.invitees}
                  optionLabel="displayName"
                  filter={true}
                  className="invited"
                />
              </StyledScrollPanel>
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
              <FooterWrapper>
                <img src="/images/onefinger.png" alt="" />
                <p>
                  We have made a point to say explicitly at the beginning of
                  every meeting, “As is our new standard procedure, we will be
                  using the hand queue system for this meeting. As a quick
                  refresher, this is where you raise a finger if you’d like to
                  go next, or two if someone already has their finger up, and so
                  on.” This reminder is important, because it’s easy to revert
                  to old habits.
                  <a
                    href="https://shift.infinite.red/how-infinite-red-improved-remote-video-meetings-with-a-few-hand-gestures-bbebc0555335"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    &nbsp;(Read More)
                  </a>
                  &nbsp;-Jamon Holmgren, CTO,
                  <a
                    href="https://infinite.red"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    &nbsp;Infinite Red
                  </a>
                </p>
              </FooterWrapper>
            </CustomTabs>
            <CustomTabs
              headerClassName={this.props.className}
              header="Meeting Notes"
            >
              <EditorWrapper>
                <Dim>
                  <p>
                    Collaborate with your team in the notes section below. Any
                    active User can contribute.
                  </p>
                </Dim>
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
              <FooterWrapper>
                <img src="/images/onefinger.png" alt="" />
                <p>
                  We have made a point to say explicitly at the beginning of
                  every meeting, “As is our new standard procedure, we will be
                  using the hand queue system for this meeting. As a quick
                  refresher, this is where you raise a finger if you’d like to
                  go next, or two if someone already has their finger up, and so
                  on.” This reminder is important, because it’s easy to revert
                  to old habits.
                  <a
                    href="https://shift.infinite.red/how-infinite-red-improved-remote-video-meetings-with-a-few-hand-gestures-bbebc0555335"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    &nbsp;(Read More)
                  </a>
                  &nbsp;-Jamon Holmgren, CTO,
                  <a
                    href="https://infinite.red"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    &nbsp;Infinite Red
                  </a>
                </p>
              </FooterWrapper>
            </CustomTabs>
            <CustomTabs
              headerClassName={this.props.className}
              header="Meeting Notes"
            >
              <EditorWrapper>
                <Dim>
                  <p>
                    Collaborate with your team in the notes section below. Any
                    active user can contribute.
                  </p>
                </Dim>
                <Editor
                  theme="snow"
                  value={this.state.text}
                  onChange={this.handleChange}
                  name="text"
                />

                <FinalizeButton
                  style={{ width: "200px" }}
                  onClick={this.finalizeMeeting}
                >
                  Save
                </FinalizeButton>
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
