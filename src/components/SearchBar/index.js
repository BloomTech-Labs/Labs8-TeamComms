import React, { Component } from "react";
import styled from "styled-components";
// import { CustomInput } from "../Common";

const SearchWrapper = styled.div`
  grid-column: 2;
  grid-row: 2;
  width: 100%;
  padding: 1rem;
  background: #25bea0;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 20px;
  color: #323232;
  text-align: left;
  padding: 1rem;
  border-radius: 10px;
  font-family: "Font Awesome 5 Free"; // for the open access version
  font-size: 1.3333333333333333em;
  font-weight: 900;
  outline: none;
  color: grey;
  :focus {
    font-family: "Roboto";
    ::placeholder {
      color: white;
    }
  }
`;

class SearchBar extends Component {
  render() {
    return (
      <SearchWrapper>
        <SearchInput placeholder="&#xf002;" />
      </SearchWrapper>
    );
  }
}

export default SearchBar;
