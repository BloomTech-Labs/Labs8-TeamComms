import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const GButton = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  position: relative;
  width: 13em;
  margin: 0.2em;
  margin-left: 50px;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
  background: #dd4b39;
  :hover {
    background: #e74b37;
  }
  :focus {
    background: #e74b37;
    outline: none;
  }
  :before {
    border-right: #bb3f30 1px solid;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
      6px 6px no-repeat;
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  :active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }
`;

class GoogleButton extends Component {
  render(props) {
    return (
      <a href="https://teamcomm2.herokuapp.com/api/auth/google">
        <GButton>Login with Google</GButton>
      </a>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {}
)(GoogleButton);
