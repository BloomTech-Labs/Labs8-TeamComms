import React, { Component } from "react";
import { callReg } from "../../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";
import { CustomInput, PrimaryButton } from "../Common/index";

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

const Main = styled.div`
  margin: 0 auto;
  padding: 5px 0 5px 0;
  background: black;
`;

const CustomInputTop = styled(CustomInput)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CustomInputBottom = styled(CustomInput)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom: none;
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
            <CustomInputTop
              placeholder="first name"
              required
              type="text"
              name="givenName"
              onChange={this.changeHandler}
              value={this.state.givenName}
            />
            <CustomInput
              placeholder="last name"
              required
              type="text"
              name="familyName"
              onChange={this.changeHandler}
              value={this.state.familyName}
            />
            <CustomInput
              placeholder="e-mail"
              required
              type="text"
              onChange={this.changeHandler}
              name="email"
              value={this.state.email}
            />
            <CustomInput
              placeholder="password"
              required
              type="password"
              name="password1"
              onChange={this.changeHandler}
              value={this.state.password1}
            />
            <CustomInputBottom
              placeholder="confirm password"
              required
              type="password"
              name="password2"
              onChange={this.changeHandler}
              value={this.state.password2}
            />
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
