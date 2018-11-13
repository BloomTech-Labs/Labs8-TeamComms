import React, { Component } from "react";
import styled from "styled-components";
import { PrimaryButton, Logo } from "../Common";

const HeaderWrapper = styled.div`
  background: #374353;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  flex-shrink: 0;
  z-index: 11;
  order: 1;
  grid-column: 2/3;
  grid-row: 1;

  :lastchild {
    justify-content: flex-end;
  }

  button:active {
  }
`;

const RegisterButton = styled(PrimaryButton)`
  background: #25bea0;
  color: #ffffff;
`;

const LoginButton = styled(PrimaryButton)`
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const HeaderText = styled.h1`
  pointer-events: none;
  position: absolute;
  margin: 0;
  left: 50%;
  width: 20rem;
  margin-left: -10rem;
  font-size: 1rem;
  text-align: center;
`;

const NavLink = styled.h1`
  pointer-events: none;
  width: 6rem;
  font-size: 1rem;
`;

class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <NavLink>Features</NavLink>
        <NavLink>Pricing</NavLink>
        <NavLink>About Us</NavLink>
        <RegisterButton>Register</RegisterButton>
        <LoginButton>Login</LoginButton>
      </HeaderWrapper>
    );
  }
}

export default Header;
