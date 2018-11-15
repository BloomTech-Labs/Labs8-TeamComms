import React, { Component } from "react";
import ConvoList from "../../components/ConvoList";
import PropTypes from "prop-types";
import QuickAdd from "../../components/QuickAdd";
import SearchBar from "../../components/SearchBar/index";
import styled from "styled-components";
import EasterEgg from "../../components/EasterEgg";
import { connect } from "react-redux";
import { callGoogleLogIn } from "../../actions/callGoogleLogIn";

//this screen should return components necessary to build the convo list page.
const ConvoGrid = styled.div`
  display: grid;
  grid-template-columns: 20rem auto;
  grid-template-rows: 2rem auto auto;
`;

class ScreensConvoList extends Component {
  componentDidMount() {
    if (this.props.match.params.token && !localStorage.getItem("jwt")) {
      this.props.callGoogleLogIn(
        this.props.history,
        this.props.match.params.token
      );
    }
  }

  render() {
    return (
      <ConvoGrid>
        <EasterEgg />
        <QuickAdd />
        <SearchBar />
        <ConvoList />
      </ConvoGrid>
    );
  }
}
ScreensConvoList.propTypes = {};

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { callGoogleLogIn }
)(ScreensConvoList);
