import React, { Component } from "react";
import styled from "styled-components";

const AddQuestion = styled.input`
  position: relative;
  width: 18rem;
  height: 50px;
  font-size: 14px;
  color: #323232;
  text-align: center;
  border: none;
  border-bottom: 1px solid lightgrey;
  box-styling: border-box;
  outline: none;
`;

const AddButton = styled.button`
  width: 3rem;
  height: 50px;
  color: #ffffff;
  background: #fabc09;
  font-size: 20px;
  border: none;
  outline: none;
  i {
    color: #ffffff;
  }
  :focus {
    background: #ffffff;
    i {
      color: #facc43;
    }
  }
`;

const StyledMiniForm = styled.form`
  display: flex;
  align-items: center;
  grid-column: 1;
  grid-row: 2;
`;

class QuickAdd extends Component {
  render() {
    return (
      <StyledMiniForm>
        <AddQuestion placeholder="Quick Add (New Conversation Name...)" />
        <AddButton>
          <i className="fas fa-plus-square fa-2x" />
        </AddButton>
      </StyledMiniForm>
    );
  }
}

export default QuickAdd;
