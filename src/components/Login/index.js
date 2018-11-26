import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import { CustomInput, PrimaryButton, Logo, Overpane } from "../Common";
import GoogleButton from "../GoogleButton";
import { callLogIn, toggleOverpane } from "../../actions/index";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 5px 0;
  width: 360px;
  margin: 150px auto;
  z-index: 2000;
  border-radius: 10px;
  padding: 20px;
  background: #ffffff;
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

const CustomInputTop = styled(CustomInput)`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const CustomInputBottom = styled(CustomInput)`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top: none;
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
          <Logo img src="../images/logo.png" />
          <FormWrapper
            method="post"
            onSubmit={(e, history, overpane) => {
              this.handleLogInSubmit(
                e,
                userInput,
                this.props.history,
                !this.props.overpane
              );
            }}
          >
            <CustomInputTop
              placeholder="email"
              required
              type="text"
              onChange={this.changeHandler}
              name="email"
              value={this.state.email}
            />{" "}
            <CustomInputBottom
              placeholder="password"
              required
              type="password"
              name="password"
              onChange={this.changeHandler}
              value={this.state.password}
            />
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
