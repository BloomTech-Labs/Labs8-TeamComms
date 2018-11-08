import React, { Component } from "react";
import Header from "../../components/Header";
import Signin from "../../components/Signin";
import PropTypes from "prop-types";

//this screen should return components necessary to build the landing page.

class ScreensSignin extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Signin />
      </React.Fragment>
    );
  }
}
ScreensSignin.propTypes = {};

export default ScreensSignin;
