import React, { Component } from "react";
import axios from "axios";
import "./signup.css";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: "",
      password2: "",
      user: {}
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
    if (credentials.password1 === credentials.password2) {
      const body = {
        email: credentials.username,
        password: credentials.password1,
        username: credentials.username,
        phone_number: Math.random() * 10
      };
      const temp = JSON.stringify(body);
      console.log(temp);
      console.log(body);
      const headers = {
        "Content-Type": "application/json"
      };
      axios
        .post("https://teamcomm2.herokuapp.com/api/users/register", temp, {
          headers: headers
        })
        .then(res => {
          console.log("Token: ", res.data.token);
          console.log("User: ", res.data.user);
          localStorage.setItem("jwt", res.token);
          this.setState({ user: res.user });
        })
        .catch(err => console.log({ err }));
    } else {
      console.log("Passwords do not match");
    }
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
            <span className="switch-text">
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
