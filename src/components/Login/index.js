import React, {
  Component
} from "react";
import axios from "axios";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password1: ""
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  userSignin = (e, credentials) => {
    e.preventDefault();
    const body = {
      email: credentials.username,
      password: credentials.password1
    };
    const temp = JSON.stringify(body);
    console.log(temp);
    console.log(body);
    const headers = {
      "Content-Type": "application/json"
    };
    axios
      .post("https://teamcomm2.herokuapp.com/api/users/login", temp, {
        headers: headers
      })
      .then(res => {
        alert(credentials.username + ", you are now logged in.");
        console.log("Token: ", res.data.token);
        console.log("User: ", res.data.user);
        localStorage.setItem("jwt", res.token);
        this.setState({
          user: res.user
        });
      })
      .catch(err => console.log({
        err
      }));
  };

  render() {
    let credentials = {
      username: this.state.username,
      password1: this.state.password1
    };
    return ( <
      React.Fragment >
      <
      div className = "main" >
      <
      form method = "post"
      className = "form-wrapper"
      onSubmit = {
        e => {
          this.userRegister(e, credentials);
        }
      } >
      <
      img src = "./images/logo.png"
      alt = "" / >
      <
      br / >
      <
      input placeholder = "username"
      className = "custominput-top"
      required type = "text"
      onChange = {
        this.changeHandler
      }
      name = "username"
      value = {
        this.state.username
      }
      /> <
      input placeholder = "password"
      className = "custominput-bottom"
      required type = "password"
      name = "password1"
      onChange = {
        this.changeHandler
      }
      value = {
        this.state.password1
      }
      /> <
      button type = "submit"
      className = "signin-button" >
      Sign In <
      /button> < /
      form > <
      /div> < /
      React.Fragment >
    );
  }
}

export default Login;