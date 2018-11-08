import React, { Component } from "react";
import axios from "axios";
import "./signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: ""
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  userRegister = (e, credentials) => {
    e.preventDefault();
    credentials = JSON.stringify(credentials);
    console.log(credentials);
  };

  render() {
    let credentials = {
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
            onSubmit={e => {
              this.userRegister(e, credentials);
            }}
          >
            <img src="./images/logo.png" alt="" />
            <br />
            <input
              placeholder="username"
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
            <button type="submit" className="register-button">
              Signup
            </button>
            <span class="switch-text">
              Already Registered?
              <button className="switch-button"> Click here to Login.</button>
            </span>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
