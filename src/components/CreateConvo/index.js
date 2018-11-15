import React, { Component } from "react";
import styled from "styled-components";
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

const CustomInputTop = styled(CustomInput)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
`;

const CustomInputBottom = styled(CustomInput)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: none;
  width: 100%;
`;

const CustomInputMiddle = styled(CustomInput)`
  width: 100%;
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

class CreateConvo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      time: "",
      timezone: "",
      participants: ["Participant 1", "Participant 2", "Participant 3"],
      participant: "",
      questions: [
        "Question number 1?",
        "Question number 2?",
        "Question number 3?"
      ],
      question: ""
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

  addParticipants = e => {
    e.preventDefault();
    const participants = this.state.participants;
    participants.push(this.state.participant);
    this.setState({ participants, participant: "" });
  };

  render() {
    const userInput = {
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      participants: this.state.participants,
      questions: this.state.questions
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
              <CustomInputTop
                placeholder="Meeting Name"
                required
                type="text"
                name="name"
                onChange={this.changeHandler}
                value={this.state.familyName}
              />
              <br />
              <CustomInputMiddle
                placeholder="Date"
                required
                type="date"
                onChange={this.changeHandler}
                name="date"
                value={this.state.email}
              />
              <br />
              <CustomInputBottom
                placeholder="Time"
                required
                type="time"
                onChange={this.changeHandler}
                name="time"
                value={this.state.email}
              />
            </Group>
            <Group>
              <legend>Questions:</legend>
              <ul>
                {this.state.questions.map(question => (
                  <Entry>{question}</Entry>
                ))}
              </ul>
              <CustomInputSingle
                placeholder="Type a question"
                type="text"
                name="question"
                onChange={this.changeHandler}
                value={this.state.question}
              />
              <AddButton onClick={this.addQestions}>+</AddButton>
            </Group>
            <Group>
              <legend>Participants:</legend>
              <ul>
                {this.state.participants.map(participant => (
                  <Entry>{participant}</Entry>
                ))}
              </ul>
              <CustomInputSingle
                placeholder="Search"
                type="text"
                name="participant"
                onChange={this.changeHandler}
                value={this.state.participant}
              />
              <AddButton onClick={this.addParticipants}>+</AddButton>
            </Group>
            <RegisterButton type="submit"> Save </RegisterButton>
          </FormWrapper>
        </Main>
      </React.Fragment>
    );
  }
}

export default CreateConvo;
