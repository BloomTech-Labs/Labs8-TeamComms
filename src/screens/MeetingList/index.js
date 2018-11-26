import React, { Component } from "react";
import MeetingList from "../../components/MeetingList";
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
  grid-template-rows: 4rem auto auto;
`;

class ScreensMeetingList extends Component {
  constructor() {
    super();
    this.state = {
      toggleOverpane: true
    };
  }
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
        <QuickAdd toggleOverpane={this.toggleOverpane} />
        <SearchBar />
        <MeetingList />
      </ConvoGrid>
    );
  }
}
ScreensMeetingList.propTypes = {};

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  { callGoogleLogIn }
)(ScreensMeetingList);
