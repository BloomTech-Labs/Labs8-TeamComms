import React, { Component } from "react";
import { connect } from "react-redux";
import { callCreate } from "../../actions/index";
import styled from "styled-components";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { AutoComplete } from "primereact/autocomplete";
import { PrimaryButton } from "../Common";
import moment from "moment";
import axios from "axios";
import { Message } from "primereact/message";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  background-color: white;
  align-items: center;
  justify-content: center;
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
    width: 90%;
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
  width: 45%;
  height: 65px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 1.5rem;
  margin: 10px 15px;
  border: none;
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

class CreateMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      start: "",
      end: "",
      repeat: false,
      createZoom: false,
      invitees: [],
      invited: "",
      invite: "",
      question: "",
      questions: [],
      users: []
    };
  }

  componentDidMount() {
    var passedTitle;
    if (this.props.history.location.search) {
      passedTitle = this.props.history.location.search;
      passedTitle = passedTitle.substring(1);
      this.setState({ title: passedTitle });
    } else {
      passedTitle = "";
    }

    axios
      .get("https://teamcomm2.herokuapp.com/api/users/allusers", {
        headers: { Authorization: localStorage.getItem("jwt") }
      })
      .then(res => {
        console.log(res.data);
        this.setState({ users: res.data });
      })
      .catch(err => console.log(err));
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  saveForLater = (e, userInput, history) => {
    let dashboard = true;
    this.handleNewConvo(e, userInput, history, dashboard);
  };

  handleNewConvo = async (e, userInput, history, dashboard) => {
    e.preventDefault();
    console.log(userInput);
    const body = {
      title: userInput.title,
      description: userInput.description,
      startTime: moment(userInput.start),
      endTime: moment(userInput.end),
      repeat: userInput.repeat,
      createZoom: userInput.createZoom,
      invitees: userInput.invitees.map(invited => invited._id),
      questions: userInput.questions
    };
    const header = { Authorization: localStorage.getItem("jwt") };
    console.log("Header: ", header);
    console.log("Body: ", body);
    this.props.callCreate(e, header, body, history, dashboard);
    this.setState({
      title: "",
      description: "",
      start: "",
      end: "",
      repeat: "",
      createZoom: "",
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

    console.log("usersug", this.state.userSuggestions);
    console.log("possible", possible);
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
      createZoom: this.state.createZoom,
      invitees: this.state.invitees,
      questions: this.state.questions
    };
    let history = this.props.history;
    let dashboard = false;
    return (
      <React.Fragment>
        <Main>
          <FormWrapper
            onSubmit={e => {
              this.handleNewConvo(e, userInput, history, dashboard);
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
                  name="start"
                  value={this.state.start}
                  onChange={this.changeHandler}
                  inputClassName="input"
                  className="datePicker"
                  placeholder="Start"
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
                />
              </NewSpan>

              {/* Repeat */}
              <NewSpan>
                <Checkbox
                  inputId="repeat"
                  name="repeat"
                  onChange={e => this.setState({ repeat: !this.state.repeat })}
                  checked={this.state.repeat === true}
                />
                <label htmlFor="repeat" className="p-checkbox-label">
                  Repeat
                </label>
              </NewSpan>
            {/* ZOOM! */}
              <NewSpan>
                <Checkbox
                  inputId="createZoom"
                  name="createZoom"
                  onChange={e => this.setState({ createZoom: !this.state.createZoom })}
                  checked={this.state.createZoom === true}
                />
                <label htmlFor="createZoom" className="p-checkbox-label">
                  Create ZOOM Meeting!
                </label>
              </NewSpan>

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
                  this.saveForLater(e, userInput, history);
                }}
              >
                Save for Later
              </SaveButton>
              <SaveButton type="submit">Save and View</SaveButton>
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
    callCreate
  }
)(CreateMeeting);
