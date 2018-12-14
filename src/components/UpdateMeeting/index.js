import React, { Component } from "react";
import { connect } from "react-redux";
import { callUpdateMeeting } from "../../actions/index";
import styled from "styled-components";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { AutoComplete } from "primereact/autocomplete";
import { PrimaryButton } from "../Common";
import moment from "moment";
import axios from "axios";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid #25bea0;
  border-radius: 5px;
  margin: 0 auto;
  width: 90%;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: white;
  align-items: center;
  justify-content: center;
  @media (max-width: 650px) {
    width: 90%;
  }
`;
const Group = styled.fieldset`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px 20px 10px;
  margin: 10px 15px;
  legend {
    padding: 8px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 60%;
    margin: 0px;
    padding: 0px;
  }
`;
const QGroup = styled.fieldset`
  width: 83%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px 20px 10px;
  // margin: 10px 15px;
  legend {
    padding: 8px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 90%;
    margin: 0px;
    padding: 0px;
  }
`;
const NewSpan = styled.span`
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
`;
const QSpan = styled.span`
  margin-top: 20px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const QInput = styled(InputText)`
  width: 90%;
  &&& {
    margin-top: 20px;
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;
const AutoInput = styled(AutoComplete)`
  width: 90%;
  &&& {
    input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

const SaveButton = styled(PrimaryButton)`
  width: 200px;
  height: 65px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 1.5rem;
  margin: 10px 15px;
  border: none;
  letter-spacing: 0.1em;
`;

const AddButton = styled.button`
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px 10px 10px 10px;
  height: 31px;
  background: #25bea0;
  color: white;
  font-weight: bolder;
  line-height: 1;
`;

const Entry = styled.li`
  margin: 0 0 10px 0;
  color: black;
`;

class UpdateMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      start: "",
      end: "",
      repeat: false,
      invitees: [],
      invited: "",
      invite: "",
      question: "",
      questions: [],
      users: []
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    axios
      .get("https://teamcomm2.herokuapp.com/api/users/allusers", {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));

    const id = this.props.match.params.id;
    axios
      .get(`https://teamcomm2.herokuapp.com/api/meeting/findbyid/${id}`, {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({
          title: res.data.title,
          description: res.data.description,
          start: moment(res.data.start_time).format("MM/DD/YYYY hh:mm A"),
          end: moment(res.data.end_time).format("MM/DD/YYYY hh:mm A"),
          repeat: res.data.repeat,
          invitees: res.data.invitees,
          questions: res.data.questions.map(question => question.question)
        });
      })
      .catch(err => console.log(err));
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  saveForLater = (e, userInput, history, id) => {
    let dashboard = true;
    this.handleUpdateConvo(e, userInput, history, dashboard, id);
  };

  handleUpdateConvo = async (e, userInput, history, dashboard, id) => {
    e.preventDefault();
    let inviteeCheck =
      userInput.invitees.length > 0
        ? userInput.invitees.map(invited => invited._id)
        : [];
    const body = {
      title: userInput.title,
      description: userInput.description,
      startTime: moment(userInput.start),
      endtime: moment(userInput.end),
      repeat: userInput.repeat,
      invitees: inviteeCheck,
      questions: userInput.questions
    };

    const header = { Authorization: localStorage.getItem("jwt") };
    this.props.callUpdateMeeting(e, header, body, history, dashboard, id);
    this.setState({
      title: "",
      description: "",
      start: "",
      end: "",
      repeat: "",
      invitees: [],
      questions: [],
      invited: "",
      question: "",
      userSuggestions: null,
      users: []
    });
  };

  addQuestions = e => {
    e.preventDefault();
    if (this.state.question) {
      const questions = this.state.questions;
      questions.push(this.state.question);
      this.setState({ questions, question: "" });
    } else {
      alert("Enter a Question");
    }
  };

  addInvitees = e => {
    e.preventDefault();
    var possible;
    if (this.state.userSuggestions) {
      // const possible = this.state.userSuggestions.filter(user => {
      //   return Object.values(user).includes(this.state.invited);
      possible = this.state.userSuggestions;
    }

    if (possible.includes(this.state.invited)) {
      const invitees = this.state.invitees;
      invitees.push(this.state.invited);
      this.setState({ invitees, invited: "" });
    } else {
      alert("User does not exist.");
    }
  };

  suggestUsers(event) {
    let results = this.state.users.filter(user => {
      return user.displayName
        .toLowerCase()
        .startsWith(event.query.toLowerCase());
    });

    this.setState({ userSuggestions: results });
  }

  render() {
    const userInput = {
      title: this.state.title,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      repeat: this.state.repeat,
      invitees: this.state.invitees,
      questions: this.state.questions
    };
    let history = this.props.history;
    let dashboard = false;
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <Main>
          <FormWrapper
            onSubmit={e => {
              this.handleUpdateConvo(e, userInput, history, dashboard, id);
            }}
          >
            <Group>
              <legend>Meeting Details:</legend>
              {/* Title */}
              <NewSpan>
                <TextInput
                  id="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.changeHandler}
                  placeholder="Meeting Name"
                />
              </NewSpan>

              {/* Description */}
              <NewSpan className="">
                <TextInput
                  id="description"
                  name="description"
                  value={this.state.description}
                  onChange={this.changeHandler}
                  placeholder="Description"
                />
              </NewSpan>

              {/* Start */}
              <NewSpan className="">
                <Calendar
                  showTime={true}
                  hourFormat="12"
                  id="start"
                  name={"start"}
                  value={this.state.start}
                  onChange={this.changeHandler}
                  inputClassName="input"
                  className="datePicker"
                  placeholder="Start"
                  // readOnlyInput={true}
                  minDate={moment().toDate()}
                  panelClassName={"calendar-overrideStart"}
                />

                <Calendar
                  showTime={true}
                  hourFormat="12"
                  id="end"
                  name="end"
                  value={this.state.end}
                  onChange={this.changeHandler}
                  inputClassName="input"
                  className="datePicker"
                  placeholder="End"
                  // readOnlyInput={true}
                  minDate={moment().toDate()}
                  panelClassName={"calendar-overrideEnd"}
                />
              </NewSpan>

              {/* Repeat */}
              {/* <NewSpan>
                <Checkbox
                  inputId="repeat"
                  name="repeat"
                  onChange={e => this.setState({ repeat: !this.state.repeat })}
                  checked={this.state.repeat === true}
                />
                <label htmlFor="repeat" className="p-checkbox-label">
                  Repeat
                </label>
              </NewSpan> */}
            </Group>

            <Group>
              <legend>Invited:</legend>
              {/* Add Invitees */}
              <QSpan className="">
                <AutoInput
                  id="invited"
                  name="invited"
                  value={this.state.invited}
                  field="email"
                  style={{ width: "90%" }}
                  inputStyle={{ width: "100%" }}
                  onChange={e => this.setState({ invited: e.value })}
                  suggestions={this.state.userSuggestions}
                  completeMethod={this.suggestUsers.bind(this)}
                  placeholder="Add Invitees"
                  onSubmit={this.addInvitees}
                />
                <AddButton onClick={this.addInvitees}>+</AddButton>
              </QSpan>

              {/* Invitees List */}
              <ScrollPanel
                style={{ width: "100%", height: "150px", marginTop: "20px" }}
              >
                {this.state.invitees.map(invited => {
                  return <Entry>{invited.displayName}</Entry>;
                })}
              </ScrollPanel>
            </Group>
            <QGroup onSubmit={this.addQuestions}>
              <legend>Questions:</legend>
              {/* Add Question */}
              <QSpan className="">
                <QInput
                  id="question"
                  name="question"
                  value={this.state.question}
                  onChange={this.changeHandler}
                  placeholder="Add Questions"
                />

                <AddButton onClick={this.addQuestions}>+</AddButton>
              </QSpan>

              {/* Questions List */}
              <ScrollPanel
                style={{ width: "100%", height: "75px", marginTop: "20px" }}
              >
                {this.state.questions.map(question => (
                  <Entry>{question}</Entry>
                ))}
              </ScrollPanel>
            </QGroup>
            {/* Save Button */}
            <NewSpan>
              <SaveButton
                onClick={e => {
                  this.saveForLater(e, userInput, history, id);
                }}
              >
                Save
              </SaveButton>
              <SaveButton type="submit">Save & View</SaveButton>
            </NewSpan>
          </FormWrapper>
        </Main>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  {
    callUpdateMeeting
  }
)(UpdateMeeting);
