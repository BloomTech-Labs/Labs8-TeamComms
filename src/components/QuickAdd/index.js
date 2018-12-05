import React, { Component } from "react";
import styled from "styled-components";
// import { NavLink } from "../Common";
import { Link } from "react-router-dom";
import history from "../../history";

const AddQuestion = styled.input`
  position: relative;
  width: 18rem;
  height: 35px;
  font-size: 14px;
  color: #323232;
  text-align: center;
  border: none;
  border: 1px solid lightgrey;
  box-styling: border-box;
  @media (max-width: 500px) {
    margin-left: 0.5rem;
  }
`;

const AddButton = styled.button`
  width: 3rem;
  height: 50px;
  color: #ffffff;
  background: none;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 0;
  margin-left: 0;
  i {
    color: #374353;
    background: none;
  }
  :focus {
    background: #ffffff;
    i {
      color: #facc43;
    }
  }
`;
const ButtonNavLink = styled(Link)`
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  padding-left: 0;
  margin-left: 0;
`;

const StyledMiniForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  padding-left: 1rem;
  @media (max-width: 500px) {
    padding: 0 1rem 0 1rem;
  }
`;

class QuickAdd extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  changeHandler = e => {
    this.setState({ title: e.target.value });
  };

  createMeeting = e => {
    e.preventDefault();
    history.push({ pathname: "/createmeeting", search: this.state.title });
  };

  render() {
    return (
      <StyledMiniForm
        onSubmit={e => {
          this.createMeeting(e);
        }}
      >
        <AddQuestion
          name="title"
          value={this.state.title}
          onChange={e => {
            this.changeHandler(e);
          }}
          placeholder="Quick Add (New Conversation Name...)"
        />
        <AddButton>
          <ButtonNavLink
            to={{
              pathname: "/createmeeting",
              search: this.state.title
            }}
          >
            <i className="fas fa-plus-square fa-2x" />
          </ButtonNavLink>
        </AddButton>
      </StyledMiniForm>
    );
  }
}

export default QuickAdd;
