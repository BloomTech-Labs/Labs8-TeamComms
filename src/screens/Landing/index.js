import React, { Component } from "react";
import Header from "../../components/Header";
import Signup from "../../components/Signup";
import PropTypes from "prop-types";

//this screen should return components necessary to build the landing page.

class ScreensLanding extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Signup />
      </React.Fragment>
    );
  }
}
ScreensLanding.propTypes = {};

export default ScreensLanding;
