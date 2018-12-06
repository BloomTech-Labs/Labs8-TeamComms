import React, { Component } from "react";
import Login from "../../components/Login";

//this screen should return components necessary to build the login

class ScreensLogin extends Component {
  render(props) {
    return (
      <div
        style={{ width: "300px", margin: "0 auto", opacity: "1" }}
        onClick={event => event.stopPropagation()}
      >
        <Login {...this.props} />
      </div>
    );
  }
}
ScreensLogin.propTypes = {};

export default ScreensLogin;
