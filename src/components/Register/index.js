import axios from "axios";
import React, { Component } from "react";
import { callReg } from "../../actions/index";
import { connect } from "react-redux";
import "./register.css";
import styled from "styled-components";

const RegisterButton = styled.button`
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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
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

  handleRegSubmit = (e, userInput) => {
    if (userInput.password1 === userInput.password2) {
      const credentials = {
        email: userInput.username,
        password: userInput.password1,
        username: userInput.username,
        phone_number: Math.random() * 10
      };
      this.props.callReg(e, credentials);
    } else {
      e.preventDefault();
      alert("Passwords do not match!");
      return;
    }
  };

  render() {
    let userInput = {
      username: this.state.username,
      password1: this.state.password1,
      password2: this.state.password2
    };
    return (
      <React.Fragment>
        <div className="main">
          <form
            method="post"
            className="form-wrapper"
            onSubmit={(e, userInput) => {
              this.handleRegSubmit(e, userInput);
            }}
          >
            <img src="./images/logo.png" alt="" />
            <br />
            <input
              placeholder="e-mail"
              className="custominput-top"
              required
              type="text"
              onChange={this.changeHandler}
              name="username"
              value={this.state.username}
            />{" "}
            <input
              placeholder="password"
              className="custominput"
              required
              type="password"
              name="password1"
              onChange={this.changeHandler}
              value={this.state.password1}
            />{" "}
            <input
              placeholder="confirm password"
              className="custominput-bottom"
              required
              type="password"
              name="password2"
              onChange={this.changeHandler}
              value={this.state.password2}
            />
            <RegisterButton type="submit"> Register </RegisterButton>
            <SwitchText>
              Already Registered ?
              <SwitchLink onClick={this.switchToLogin}>
                &nbsp; Login.
              </SwitchLink>
            </SwitchText>
          </form>
        </div>
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
