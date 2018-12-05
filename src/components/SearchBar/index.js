import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
// import { CustomInput } from "../Common";

const SearchWrapper = styled.div`
  width: 100%;
  padding: 1rem;
  // background: #25bea0;
  @media (max-width: 500px) {
    flex-basis: 100%;
    margin: 0;
    height: 35px;
    padding: 1.5rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 15px;
  font-size: 16px;
  color: #323232;
  text-align: left;
  padding: 1rem;
  border-radius: 5px;
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  outline: none;
  border: 1px solid lightgrey;
  color: grey;
  :focus {
    font-family: "Roboto";
    ::placeholder {
      color: white;
    }
  }
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }
  componentDidMount() {
    let filteredMeetings = this.props.meetings.filter(meetings => {
      return meetings.title.includes(this.state.search);
    });
    if (this.state.search.length === "") {
      this.props.filtered(filteredMeetings, this.state.search);
    }
  }

  search = e => {
    this.setState({ search: e.target.value });
    let filteredMeetings = this.props.meetings.filter(meetings => {
      return meetings.title.includes(this.state.search);
    });

    console.log("filteredMeetings", filteredMeetings);
    console.log("meetings", this.props.meetings);

    this.props.filtered(filteredMeetings, e.target.value);
  };
  render() {
    return (
      <SearchWrapper>
        <SearchInput
          name="search"
          value={this.state.search}
          onChange={this.search}
          placeholder="&#xf002;"
        />
      </SearchWrapper>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(SearchBar);
