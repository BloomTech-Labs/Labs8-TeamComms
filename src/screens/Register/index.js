import React, {
  Component
} from "react";
import Header from "../../components/Header";
import Register from "../../components/Register";
import PropTypes from "prop-types";

//this screen should return components necessary to build the landing page.

class ScreensLanding extends Component {
  render() {
    return ( <
      React.Fragment >
      <
      Header / >
      <
      Register / >
      <
      /React.Fragment>
    );
  }
}
ScreensLanding.propTypes = {};

export default ScreensLanding;