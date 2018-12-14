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
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
import moment from "moment";

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
    margin-right: 0;
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

const Editor = styled(ReactQuill)`
  width: 500px;
  margin-top: 20px;
  .ql-container {
    height: 253px;
  }
  @media (max-width: 768px) {
    max-width: 400px;
  }
  @media (max-width: 400px) {
    max-width: 330px;
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
    const humanDate = moment(this.meeting.startTime).format("llll");

    return (
      <Fragment>
        <MeetingDetailTable>
          <table className="top-table">
            <caption>
              <h1>Meeting Details</h1>
            </caption>
            <thead>
              <tr>
                <th>Title</th>
                <th>Start Time</th>
                <th>Zoom Link</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.meeting.title}</td>
                <td>{humanDate}</td>
                <td>
                  <a
                    href={`${this.meeting.zoom}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {this.meeting.zoom}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </MeetingDetailTable>
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

const MeetingDetailTable = styled.div`
  table {
    @media (min-width: 768px) {
      width: 100%;
      margin: 0 auto;
    }
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    overflow: hidden;
    border-bottom: 1px solid lightgrey;
    margin: 0 auto;
    position: relative;
    margin-bottom: 1%;

    margin-top: 3%;
    letter-spacing: 0.1em;
  }
  table td {
    padding: 10px;
  }
  table h1 {
    color: #ffffff;
    font-size: 20px;
    background: #25bea0;
    line-height: 1.5;
    margin-bottom: 3px;
    font-family: Sans-Serif;
  }
  table * {
    position: relative;
  }
  table td,
  table th {
    padding-left: 8px;
    width: 33%;
  }
  table thead tr {
    background: #f4f4f4;
    color: #374353;
    font-size: 14px;
    line-height: 2;
    border-bottom: 1px solid lightgrey;
  }
  table tbody tr {
    border-bottom: 1px solid #e3f1d5;
    height: 50px;
    text-align: center;
    /* background: #25bea0; */
  }
  table tbody tr:last-child {
    border: 0;
  }
  table td,
  table th {
    text-align: left;
  }
  table td.l,
  table th.l {
    text-align: right;
  }
  table td.c,
  table th.c {
    text-align: center;
  }
  table td.r,
  table th.r {
    text-align: center;
  }

  @media screen and (max-width: 35.5em) {
    table {
      display: block;
    }
    table > *,
    table tr,
    table td,
    table th {
      display: block;
      width: auto;
    }
    table thead {
      display: none;
    }
    table tbody tr {
      height: auto;
      padding: 8px 0;
    }
    table tbody tr td {
      padding-left: 45%;
      margin-bottom: 12px;
    }
    table tbody tr td:last-child {
      margin-bottom: 0;
    }
    table tbody tr td:before {
      position: absolute;
      font-weight: 700;
      width: 40%;
      left: 10px;
      top: 0;
    }
    table tbody tr td:nth-child(1):before {
      content: "Title";
    }
    table tbody tr td:nth-child(2):before {
      content: "Start Time";
    }
    table tbody tr td:nth-child(3):before {
      content: "Zoom Link";
    }
  }
`;
