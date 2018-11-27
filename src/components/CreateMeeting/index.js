import React, { Component } from "react";
import styled from "styled-components";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { ScrollPanel } from "primereact/scrollpanel";
import { PrimaryButton } from "../Common";
import moment from "moment";

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
  padding: 10px;
  margin: 10px 15px;
`;
const QGroup = styled.fieldset`
  width: 94%;
  border: 2px groove white;
  padding: 10px;
  margin: 10px 15px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const QInput = styled(InputText)`
  width: 90%;
`;

const SaveButton = styled(PrimaryButton)`
  width: 45%;
  height: 75px;
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
  margin: 0 auto%;
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
      day: "",
      start: "",
      end: "",
      repeat: false,
      attendees: ["Tommy Jones", "Alice Smith", "Troy Johnson"],
      attendee: "",
      questions: [
        {
          question: "Dummy data or data from a server?",
          created_at: "1/15/2018",
          user: "Tommy Jones"
        },
        {
          question: "Is React the superior javascript framework?",
          created_at: "1/15/2018",
          user: "Alice Smith"
        },
        {
          question:
            "What will the world look like after being exposed to Team Communicator?",
          created_at: "1/15/2018",
          user: "Tommy Jones"
        },
        {
          question:
            "This is just one more question to test the scroll. Does the scroll work correctly?",
          created_at: "1/15/2018",
          user: "Troy Johnson"
        }
      ]
      // notes: [],
      // question: "",
      // create_at: "",
      // creatorId: "",
      // archive: []
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
    const newDate = moment(this.state.start).format("M D YYYY, h:mm:ss a Z");
    console.log(newDate);
    this.setState({
      title: "",
      description: "",
      day: "",
      start: "",
      end: "",
      repeat: false,
      attendees: ["Tommy Jones", "Alice Smith", "Troy Johnson"],
      attendee: "",
      questions: [
        {
          question: "Dummy data or data from a server?",
          created_at: "1/15/2018",
          user: "Tommy Jones"
        },
        {
          question: "Is React the superior javascript framework?",
          created_at: "1/15/2018",
          user: "Alice Smith"
        },
        {
          question:
            "What will the world look like after being exposed to Team Communicator?",
          created_at: "1/15/2018",
          user: "Tommy Jones"
        },
        {
          question:
            "This is just one more question to test the scroll. Does the scroll work correctly?",
          created_at: "1/15/2018",
          user: "Troy Johnson"
        }
      ]
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

  addAttendees = e => {
    e.preventDefault();
    if (this.state.attendee) {
      const attendees = this.state.attendees;
      attendees.push(this.state.attendee);
      this.setState({ attendees, attendee: "" });
    } else {
      alert("Enter an Attendee");
    }
  };

  render() {
    const userInput = {
      title: this.state.title,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      repeat: this.state.repeat,
      attendees: this.state.attendees,
      questions: this.state.questions
      // notes: [],
      // create_at: "",
      // creatorId: "",
      // archive: []
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
              <legend>Meeting Details:</legend>
              {/* Title */}
              <span className="p-float-label">
                <TextInput
                  id="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.changeHandler}
                />
                <label htmlFor="title">Meeting Name</label>
              </span>
              <br />
              {/* Description */}
              <span className="p-float-label">
                <TextInput
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
                  hourFormat="12"
                  id="start"
                  name="start"
                  value={this.state.start}
                  onChange={this.changeHandler}
                  inputClassName="input"
                  className="datePicker"
                />
                <label htmlFor="start">Start</label>
              </span>
              <br />
              {/* End */}
              <span className="p-float-label">
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
              </span>
              <br />
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
              <legend>Attendees:</legend>
              {/* Add Attendee */}
              <span className="p-float-label">
                <QInput
                  id="attendee"
                  name="attendee"
                  value={this.state.attendee}
                  onChange={this.changeHandler}
                />
                <label htmlFor="attendee">Add Attendees</label>
                <AddButton onClick={this.addAttendees}>+</AddButton>
              </span>
              <hr />
              {/* Attendees List */}
              <ScrollPanel style={{ width: "100%", height: "150px" }}>
                {this.state.attendees.map(attendee => (
                  <Entry>{attendee}</Entry>
                ))}
              </ScrollPanel>
            </Group>
            <QGroup>
              <legend>Questions:</legend>
              {/* Add Question */}
              <span className="p-float-label">
                <QInput
                  id="question"
                  name="question"
                  value={this.state.question}
                  onChange={this.changeHandler}
                />
                <label htmlFor="question">Add Questions</label>
                <AddButton onClick={this.addQestions}>+</AddButton>
              </span>
              <hr />
              {/* Questions List */}
              <ScrollPanel style={{ width: "100%", height: "75px" }}>
                {this.state.questions.map(question => (
                  <Entry>
                    {question.question}{" "}
                    <span style={{ fontStyle: "italic" }}>
                      Created on: {question.created_at} by {question.user}
                    </span>
                  </Entry>
                ))}
              </ScrollPanel>
            </QGroup>
            {/* Save Button */}
            <SaveButton type="submit"> Save for Later </SaveButton>
            <SaveButton type="submit"> Save and View </SaveButton>
          </FormWrapper>
        </Main>
      </React.Fragment>
    );
  }
}

export default CreateMeeting;
