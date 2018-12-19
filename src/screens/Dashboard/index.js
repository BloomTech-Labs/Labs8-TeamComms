import React, { Component } from "react";
import Dashboard from "../../components/Dashboard";
import QuickAdd from "../../components/QuickAdd";
import SearchBar from "../../components/SearchBar/index";
import styled from "styled-components";
import WelcomeMessage from "../../components/WelcomeMessage";
import { connect } from "react-redux";

//this screen should return components necessary to build the convo list page.
const MeetingGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  background: #f0f0f0;
  border: 1px solid lightgrey;
  @media (max-width: 500px) {
    flex-direction: column;
    padding-top: 1rem;
  }
`;

class ScreensDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredMeetings: [],
      search: ""
    };
  }
  componentDidMount() {}

  filtered = (meetings, search) => {
    this.setState({ filteredMeetings: meetings, search: search });
  };

  render() {
    if (this.state.search !== "") {
      var filtered_meetings = (
        <Dashboard
          token={this.props.match.params.token}
          filteredMeetings={this.state.filteredMeetings}
          search={this.state.search}
        />
      );
    } else {
      filtered_meetings = (
        <Dashboard
          token={this.props.match.params.token}
          filteredMeetings={this.props.meetings}
          search={this.state.search}
        />
      );
    }

    return (
      <MeetingGrid>
        <WelcomeMessage />
        <FlexBox>
          <QuickAdd />
          <SearchBar filtered={this.filtered} />
        </FlexBox>
        {filtered_meetings}
      </MeetingGrid>
    );
  }
}
ScreensDashboard.propTypes = {};

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(ScreensDashboard);
