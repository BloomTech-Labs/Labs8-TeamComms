import React, { Component } from "react";
import styled from "styled-components";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { AutoComplete } from "primereact/autocomplete";
import { CustomInput, PrimaryButton } from "../Common";

const Main = styled.div`
  padding: 5px 0 5px 0;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  color: white;
`;

const Group = styled.fieldset`
  width: 50%;
  border: 2px groove white;
  padding: 10px;
  margin: 10px 15px;
`;

const CustomInputSingle = styled(CustomInput)`
  border-radius: 10px;
  width: 90%;
`;

const RegisterButton = styled(PrimaryButton)`
  width: 50%;
  height: 75px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 28px;
  margin: 2% 15px;
  border: none;
`;

const AddButton = styled.button`
  border: none;
  border-radius: 50px;
  padding: 10px;
  margin: 0 2%;
  background: #25bea0;
  color: white;
  font-weight: bolder;
  line-height: 1;
`;

const Entry = styled.li`
  margin: 0 0 10px 0;
`;

class CreateMeeting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      start: "",
      end: "",
      repeat: "",
      attendees: ["Attendee 1", "Attendee 2"],
      attendee: "",
      questions: ["Question number 1?", "Question number 2?"],
      notes: [],
      question: "",
      create_at: "",
      creatorId: "",
      archive: []
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleNewConvo = (e, userInput, history) => {
    e.preventDefault();
    console.log(userInput);
  };

  addQestions = e => {
    e.preventDefault();
    const questions = this.state.questions;
    questions.push(this.state.question);
    this.setState({ questions, question: "" });
  };

  addAttendees = e => {
    e.preventDefault();
    const attendees = this.state.attendees;
    attendees.push(this.state.attendee);
    this.setState({ attendees, attendee: "" });
  };

  render() {
    const userInput = {
      title: "",
      description: "",
      start: "",
      end: "",
      repeat: "",
      attendees: ["Attendee 1", "Attendee 2"],
      questions: ["Question number 1?", "Question number 2?"],
      notes: [],
      create_at: "",
      creatorId: "",
      archive: []
    };
    let history = this.props.history;
    return (
      <React.Fragment>
        <Main>
          <FormWrapper
            onSubmit={e => {
              this.handleNewConvo(e, userInput, history);
            }}
          >
            <Group>
              <legend>Conversation Details:</legend>
              {/* Title */}
              <span className="p-float-label">
                <InputText
                  id="title"
                  name="title"
                  value={this.state.value}
                  onChange={this.changeHandler}
                />
                <label htmlFor="title">Meeting Name</label>
              </span>
              <br />
              {/* Description */}
              <span className="p-float-label">
                <InputText
                  id="description"
                  name="description"
                  value={this.state.description}
                  onChange={this.changeHandler}
                />
                <label htmlFor="description">Description</label>
              </span>
              <br />
              {/* Start */}
              <span className="p-float-label">
                <Calendar
                  showTime={true}
                  id="start"
                  name="start"
                  hourFormat="12"
                  value={this.state.start}
                  onChange={this.changeHandler}
                />
                <label htmlFor="start">Start Date</label>
              </span>
              <br />
              {/* End */}
              <span className="p-float-label">
                <Calendar
                  showTime={true}
                  id="end"
                  name="end"
                  hourFormat="12"
                  value={this.state.end}
                  onChange={this.changeHandler}
                />
                <label htmlFor="end">End Date</label>
              </span>
              {/* Repeat */}
              <RadioButton
                inputId="repeat"
                value="Repeat"
                name="repeat"
                onChange={e => this.setState({ repeat: !this.state.repeat })}
                checked={this.state.repeat === true}
              />
              <label htmlFor="repeat" className="p-radiobutton-label">
                Repeat
              </label>
            </Group>
            <Group>
              <legend>Attendees:</legend>
              {/* Attendees List */}
              <ul>
                {this.state.attendees.map(attendee => (
                  <Entry>{attendee}</Entry>
                ))}
              </ul>
              {/* Add Attendee */}
              <span className="p-float-label">
                <InputText
                  id="attendee"
                  name="attendee"
                  value={this.state.attendee}
                  onChange={this.changeHandler}
                />
                <label htmlFor="attendee">Add Attendees</label>
                <AddButton onClick={this.addAttendees}>+</AddButton>
              </span>
              {/* <AutoComplete
                value={this.state.attendee}
                onChange={e => this.setState({ attendee: e.value })}
                suggestions={this.state.brandSuggestions}
                completeMethod={this.suggestBrands.bind(this)}
              /> */}
            </Group>
            <Group>
              <legend>Questions:</legend>
              {/* Questions List */}
              <ul>
                {this.state.questions.map(question => (
                  <Entry>{question}</Entry>
                ))}
              </ul>
              {/* Add Question */}
              <span className="p-float-label">
                <InputText
                  id="question"
                  name="question"
                  value={this.state.question}
                  onChange={this.changeHandler}
                />
                <label htmlFor="question">Add Questions</label>
                <AddButton onClick={this.addQestions}>+</AddButton>
              </span>
            </Group>
            {/* Save Button */}
            <RegisterButton type="submit"> Save </RegisterButton>
          </FormWrapper>
        </Main>
      </React.Fragment>
    );
  }
}

export default CreateMeeting;
