import React, { Component } from "react";
import { callReg } from "../../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { PrimaryButton, SpinnerWrapper, Ul, Li } from "../Common";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";

const Main = styled.div`
  margin: 0 auto;
  padding: 5px 0 5px 0;
  background: #374353;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;
const Group = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px;
  margin: 10px 0;
`;
const NSpan = styled.span`
  margin-top: 20px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const PassInput = styled(Password)`
  width: 100%;
`;

const RegisterButton = styled(PrimaryButton)`
  width: 100%;
  height: 65px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: none;
`;
const SwitchLink = styled.a`
  color: white;
  cursor: pointer;
`;
const SwitchText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #facc43;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      givenName: "",
      familyName: "",
      validEmail: true
    };
  }

  switchToLogin = e => {
    this.props.history.push("/login");
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateEmail = (e, email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email)) {
      this.setState({ email: e.target.value, validEmail: true });
    } else {
      this.setState({ email: e.target.value, validEmail: false });
    }
  };

  handleRegSubmit = (e, userInput, history) => {
    e.preventDefault();
    console.log(userInput);
    if (userInput.password1 === userInput.password2) {
      const credentials = {
        email: userInput.email,
        password: userInput.password1,
        givenName: userInput.givenName,
        familyName: userInput.familyName
      };
      this.props.callReg(e, credentials, history);
    } else {
      e.preventDefault();
      alert("Passwords do not match!");
      return;
    }
  };

  render() {
    const userInput = {
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
      givenName: this.state.givenName,
      familyName: this.state.familyName
    };

    let history = this.props.history;

    return (
      <React.Fragment>
        {this.props.loginLoading ? (
          <SpinnerWrapper>
            <ProgressSpinner />
          </SpinnerWrapper>
        ) : null}
        <Main>
          <div>
            <p>
              Team Communicator helps keep your remote team stay in sync by
              managing your meetings in the cloud.
            </p>
            <Ul>
              <Li> Track your Team's Questions and Meeting Notes</Li>
              <Li> Upload Directly to Youtube </Li>
              <Li> Quickly Transcribe Your Video's</Li>
              <Li> Send Transcription's Via E-Mail</Li>
            </Ul>
          </div>
          <FormWrapper
            method="post"
            onSubmit={e => {
              this.handleRegSubmit(e, userInput, history);
            }}
          >
            <Group>
              <br />
              {/* First Name */}
              <NSpan className="">
                <TextInput
                  id="givenName"
                  name="givenName"
                  required
                  value={this.state.givenName}
                  onChange={this.changeHandler}
                  placeholder="First Name"
                />
              </NSpan>
              <br />
              {/* Last Name */}
              <NSpan className="">
                <TextInput
                  id="familyName"
                  name="familyName"
                  required
                  value={this.state.familyName}
                  onChange={this.changeHandler}
                  placeholder="Last Name"
                />
              </NSpan>
              <br />
              {/* Email */}
              <NSpan className="">
                <TextInput
                  id="email"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={e => {
                    this.validateEmail(e, this.state.email);
                  }}
                  placeholder="E-mail"
                />
                {this.state.validEmail ? null : (
                  <Message
                    severity="error"
                    text="Enter a valid e-mail address."
                  />
                )}
              </NSpan>

              {this.props.regError ? (
                <Message
                  severity="error"
                  text="This email address is already registered."
                />
              ) : null}
              <br />
              {/* Password 1 */}
              <NSpan className="">
                <PassInput
                  id="password1"
                  name="password1"
                  required
                  value={this.state.password1}
                  onChange={this.changeHandler}
                  placeholder="Password"
                />
              </NSpan>
              <br />
              {/* Password 2 */}
              <NSpan className="">
                <PassInput
                  id="password2"
                  name="password2"
                  required
                  value={this.state.password2}
                  onChange={this.changeHandler}
                  placeholder="Confirm Password"
                />
              </NSpan>
              <br />
              <RegisterButton type="submit"> Register </RegisterButton>
            </Group>
          </FormWrapper>
          <SwitchText>
            Already Registered ?
            <SwitchLink onClick={this.switchToLogin}>&nbsp; Login.</SwitchLink>
          </SwitchText>
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
    callReg
  }
)(Register);
