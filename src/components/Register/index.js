
import React, { Component } from "react";
import { callReg } from '../../actions/index';
import { connect } from "react-redux";
import "./register.css";

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


  handleRegSubmit = (e, userInput ) => {
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
  }

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
            />{" "}
            <button type="submit" className="register-button">
              Register{" "}
            </button>{" "}
            <span className="switch-text">
              Already Registered ?
              <button className="switch-button" onClick={this.switchToLogin}>
                {" "}
                Click here to Login.{" "}
              </button>{" "}
            </span>{" "}
          </form>{" "}
        </div>{" "}
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
