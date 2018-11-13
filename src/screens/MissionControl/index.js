import React, { Component } from "react";
import Header from "../../components/Header";
import Register from "../../components/Register";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//this screen should return components necessary to build the user's dashboard (mission control) page.

class MissionControl extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div>
          <h1> Welcome, USERNAME </h1>
        </div>
      </React.Fragment>
    );
  }
}
// MissionControl.propTypes = {};


const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
)(MissionControl);
