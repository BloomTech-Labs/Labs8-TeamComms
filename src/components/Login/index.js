import React, { Component, Fragment } from "react";
import { callLogIn } from "../../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";
import { CustomInput, PrimaryButton } from "../Common";

const Main = styled.div`
  margin: 0 auto;
  padding: 5px 0 5px 0;
  background: #374353;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
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

  handleLogInSubmit = (e, userInput) => {
    e.preventDefault();
    this.props.callLogIn(e, userInput);
  };

  render() {
    let userInput = {
      email: this.state.email,
      password: this.state.password
    };
    return (
      <Fragment>
        <Main>
          <FormWrapper
            method="post"
            onSubmit={e => {
              this.handleLogInSubmit(e, userInput);
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
            <LoginButton type="submit">Sign In</LoginButton>
          </FormWrapper>
        </Main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    callLogIn
  }
)(Login);
