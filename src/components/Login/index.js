import React, { Component, Fragment } from "react";
import { callLogIn } from "../../actions/index";
import { connect } from "react-redux";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
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
      username: this.state.username,
      password: this.state.password
    };
    return (
      <Fragment>
        <div className="main">
          <form
            method="post"
            className="form-wrapper"
            onSubmit={e => {
              this.handleLogInSubmit(e, userInput);
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
              className="custominput-bottom"
              required
              type="password"
              name="password"
              onChange={this.changeHandler}
              value={this.state.password}
            />
            <button type="submit" className="signin-button">
              Sign In
            </button>
          </form>
        </div>
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
