import React, { Component } from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import {
  PrimaryButton,
  Logo,
  Overpane,
  CloseButton,
  LoginLogo
} from "../Common";
import GoogleButton from "../GoogleButton";
import { callLogIn, toggleOverpane } from "../../actions/index";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 5px 0;
  width: 360px;
  margin: 100px auto;
  z-index: 2000;
  padding: 20px;
  background: #ffffff;
  @media (max-width: 400px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const Text = styled.span`
  text-align: center;
  color: #374353;
  margin-bottom: 12px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 24px auto 12px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const PassInput = styled(Password)`
  width: 100%;
`;
const NSpan = styled.span`
  width: 100%;
  margin-top: 10px;
`;

const LoginButton = styled(PrimaryButton)`
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogInSubmit = (e, userInput, history, overpane) => {
    console.log(history, overpane);
    this.props.callLogIn(e, userInput, history, overpane);
  };

  render() {
    let userInput = {
      email: this.state.email,
      password: this.state.password
    };
    const overpane = !this.props.overpane;

    const history = this.props.history;
    return (
      <Overpane
        overpane={this.props.overpane}
        onClick={e => {
          this.props.toggleOverpane(!this.props.overpane);
        }}
      >
        <Main onClick={event => event.stopPropagation()}>
          <CloseButton
            onClick={e => {
              this.props.toggleOverpane(!this.props.overpane);
            }}
          >
            <i class="fas fa-times" />
          </CloseButton>
          <LoginLogo img src="../images/logo.png" />
          <FormWrapper
            method="post"
            onSubmit={(e, history, overpane) => {
              this.handleLogInSubmit(
                e,
                userInput,
                history,
                !this.props.overpane
              );
            }}
          >
            <br />
            {/* Email */}
            <NSpan className="p-float-label">
              <TextInput
                id="email"
                name="email"
                required
                value={this.state.email}
                onChange={this.changeHandler}
              />
              <label htmlFor="email">Email</label>
            </NSpan>
            <br />
            {/* Password */}
            <NSpan className="p-float-label">
              <PassInput
                id="password"
                name="password"
                required
                value={this.state.password}
                onChange={this.changeHandler}
              />
              <label htmlFor="password">Password</label>
            </NSpan>
            <br />
            <LoginButton type="submit">Log In</LoginButton>
            <Text>Forgot Your Password?</Text>
          </FormWrapper>
          <Text>- or -</Text>
          <GoogleButton history={history} />
        </Main>
      </Overpane>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    callLogIn,
    toggleOverpane
  }
)(Login);
