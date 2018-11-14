import React, { Component } from "react";
import ConvoList from "../../components/ConvoList";
import PropTypes from "prop-types";
import QuickAdd from "../../components/QuickAdd";
import SearchBar from "../../components/SearchBar/index";
import styled from "styled-components";
import EasterEgg from "../../components/EasterEgg";

//this screen should return components necessary to build the convo list page.
const ConvoGrid = styled.div`
  display: grid;
  grid-template-columns: 20rem auto;
  grid-template-rows: 2rem auto auto;
`;

class ScreensConvoList extends Component {
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

export default ScreensConvoList;
