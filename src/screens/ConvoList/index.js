import React, { Component } from "react";
import ConvoList from "../../components/ConvoList";
import PropTypes from "prop-types";
import QuickAdd from "../../components/QuickAdd";
import SearchBar from "../../components/SearchBar/index";
import styled from "styled-components";

//this screen should return components necessary to build the convo list page.
const ConvoGrid = styled.div`
  display: grid;
  grid-template-columns: 15rem auto;
  grid-template-rows: auto auto;
`;

class ScreensConvoList extends Component {
  render() {
    return (
      <ConvoGrid>
        <QuickAdd />
        <SearchBar />
        <ConvoList />
      </ConvoGrid>
    );
  }
}
ScreensConvoList.propTypes = {};

export default ScreensConvoList;
