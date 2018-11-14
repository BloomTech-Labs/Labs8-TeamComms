import React, { Component } from "react";
import styled from "styled-components";
// import { CustomInput } from "../Common";

const SearchWrapper = styled.div`
  grid-column: 2/3;
  grid-row: 2;
  width: 100%;
  padding: 0.5rem;
  background: #25bea0;
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
  border: none;
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
