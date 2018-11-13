import React, { Component } from "react";
import Header from "../../components/Header";
import ConvoList from "../../components/ConvoList";
import PropTypes from "prop-types";

//this screen should return components necessary to build the convo list page.

class ScreensConvoList extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <ConvoList />
      </React.Fragment>
    );
  }
}
ScreensConvoList.propTypes = {};

export default ScreensConvoList;
