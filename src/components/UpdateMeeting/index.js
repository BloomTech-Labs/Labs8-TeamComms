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
  padding: 5px 0 5px 0;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  color: white;
`;
const Group = styled.fieldset`
  width: 45%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px 20px 10px;
  margin: 10px 15px;
`;
const QGroup = styled.fieldset`
  width: 94%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px 20px 10px;
  margin: 10px 15px;
`;
const NewSpan = styled.span`
  margin: 20px 0;
`;
const QSpan = styled.span`
  margin-top: 20px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const QInput = styled(InputText)`
  width: 90%;
`;
const AutoInput = styled(AutoComplete)`
  width: 90%;
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
  border-radius: 50px;
  padding: 10px;
  margin: 0 auto;
  background: #25bea0;
  color: white;
  font-weight: bolder;
  line-height: 1;
`;

const Entry = styled.li`
  margin: 0 0 10px 0;
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
        console.log(res.data);
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
    console.log(userInput);
    const body = {
      title: userInput.title,
      description: userInput.description,
      startTime: moment(userInput.start),
      endtime: moment(userInput.end),
      repeat: userInput.repeat
      // invitees: userInput.invitees.map(invited => invited._id),
      // questions: userInput.questions
    };
    const header = { Authorization: localStorage.getItem("jwt") };
    console.log("Header: ", header);
    console.log("Body: ", body);
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

  addQestions = e => {
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
    if (this.state.invited) {
      const invitees = this.state.invitees;
      invitees.push(this.state.invited);
      this.setState({ invitees, invited: "" });
    } else {
      alert("Enter an Name");
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
              <NewSpan className="p-float-label">
                <TextInput
                  id="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.changeHandler}
                />
                <label htmlFor="title">Meeting Name</label>
              </NewSpan>
              {/* Description */}
              <NewSpan className="p-float-label">
                <TextInput
                  id="description"
                  name="description"
                  value={this.state.description}
                  onChange={this.changeHandler}
                />
                <label htmlFor="description">Description</label>
              </NewSpan>
              {/* Start */}
              <NewSpan className="p-float-label">
                <Calendar
                  showTime={true}
                  hourFormat="12"
                  id="start"
                  name="start"
                  value={this.state.start}
                  onChange={this.changeHandler}
                  inputClassName="input"
                  className="datePicker"
                />
                <label htmlFor="start">Start</label>
              </NewSpan>
              {/* End */}
              <NewSpan className="p-float-label">
                <Calendar
                  showTime={true}
                  hourFormat="12"
                  id="end"
                  name="end"
                  value={this.state.end}
                  onChange={this.changeHandler}
                  inputClassName="input"
                  className="datePicker"
                />
                <label htmlFor="end">End</label>
              </NewSpan>
              {/* Repeat */}
              <Checkbox
                inputId="repeat"
                name="repeat"
                onChange={e => this.setState({ repeat: !this.state.repeat })}
                checked={this.state.repeat === true}
              />
              <label htmlFor="repeat" className="p-checkbox-label">
                Repeat
              </label>
            </Group>
            <Group>
              <legend>Invited:</legend>
              {/* Add Invitees */}
              <QSpan className="p-float-label">
                <AutoInput
                  id="invited"
                  name="invited"
                  value={this.state.invited}
                  field="displayName"
                  style={{ width: "90%" }}
                  inputStyle={{ width: "100%" }}
                  onChange={e => this.setState({ invited: e.value })}
                  suggestions={this.state.userSuggestions}
                  completeMethod={this.suggestUsers.bind(this)}
                />
                <label htmlFor="invited">Add Invites</label>
                <AddButton onClick={this.addInvitees}>+</AddButton>
              </QSpan>
              <hr />
              {/* Invitees List */}
              <ScrollPanel style={{ width: "100%", height: "150px" }}>
                {this.state.invitees.map(invited => (
                  <Entry>{invited.displayName}</Entry>
                ))}
              </ScrollPanel>
            </Group>
            <QGroup>
              <legend>Questions:</legend>
              {/* Add Question */}
              <QSpan className="p-float-label">
                <QInput
                  id="question"
                  name="question"
                  value={this.state.question}
                  onChange={this.changeHandler}
                />
                <label htmlFor="question">Add Questions</label>
                <AddButton onClick={this.addQestions}>+</AddButton>
              </QSpan>
              <hr />
              {/* Questions List */}
              <ScrollPanel style={{ width: "100%", height: "75px" }}>
                {this.state.questions.map(question => (
                  <Entry>{question}</Entry>
                ))}
              </ScrollPanel>
            </QGroup>
            {/* Save Button */}
            <SaveButton
              onClick={e => {
                this.saveForLater(e, userInput, history, id);
              }}
            >
              Save for Later
            </SaveButton>
            <SaveButton type="submit"> Save and View </SaveButton>
          </FormWrapper>
        </Main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  {
    callUpdateMeeting
  }
)(UpdateMeeting);
