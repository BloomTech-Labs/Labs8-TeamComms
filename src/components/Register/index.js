import React, { Component } from "react";
import { callReg } from "../../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { PrimaryButton } from "../Common/index";

const RegisterButton = styled(PrimaryButton)`
  width: 300px;
  height: 75px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 28px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
`;

const SwitchLink = styled.p`
  color: white;
  cursor: pointer;
`;

const SwitchText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #facc43;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const PassInput = styled(Password)`
  width: 100%;
`;

const Main = styled.div`
  margin: 0 auto;
  padding: 5px 0 5px 0;
  background: #374353;
`;

const NSpan = styled.span`
  width: 50%;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      givenName: "",
      familyName: ""
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
        <Main>
          <FormWrapper
            method="post"
            onSubmit={e => {
              this.handleRegSubmit(e, userInput, history);
            }}
          >
            <br />
            {/* First Name */}
            <NSpan className="p-float-label">
              <TextInput
                id="givenName"
                name="givenName"
                value={this.state.givenName}
                onChange={this.changeHandler}
              />
              <label htmlFor="givenName">First Name</label>
            </NSpan>
            <br />
            {/* Last Name */}
            <NSpan className="p-float-label">
              <TextInput
                id="familyName"
                name="familyName"
                value={this.state.familyName}
                onChange={this.changeHandler}
              />
              <label htmlFor="familyName">Last Name</label>
            </NSpan>
            <br />
            {/* Email */}
            <NSpan className="p-float-label">
              <TextInput
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.changeHandler}
              />
              <label htmlFor="email">Email</label>
            </NSpan>
            <br />
            {/* Password 1 */}
            <NSpan className="p-float-label">
              <PassInput
                id="password1"
                name="password1"
                value={this.state.password1}
                onChange={this.changeHandler}
              />
              <label htmlFor="password1">Password</label>
            </NSpan>
            <br />
            {/* Password 2 */}
            <NSpan className="p-float-label">
              <PassInput
                id="password2"
                name="password2"
                value={this.state.password2}
                onChange={this.changeHandler}
              />
              <label htmlFor="password2">Confirm Password</label>
            </NSpan>
            <br />
            <RegisterButton type="submit"> Register </RegisterButton>
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
