import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { PrimaryButton, Logo } from "../Common";
import Stripe from "../Stripe";
import { callLogOut, toggleOverpane } from "../../actions/index";

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
  a {
    text-decoration: none;
    color: white;
  }
`;

const LoginButton = styled(PrimaryButton)`
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  margin-left: 1rem;
  margin-right: 1rem;
  a {
    text-decoration: none;
    color: white;
  }
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

const NavLink = styled(Link)`
  width: 6rem;
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
`;

class Header extends Component {
  // LogOut = () => {
  //   this.props.callLogOut(this.props.history);
  // };

  render() {
    const history = this.props.history;

    return (
      <React.Fragment>
        {this.props.loginSuccess ? (
          <HeaderWrapper>
            <NavLink to="/dashboard"> DashBoard </NavLink>
            <NavLink to="/favorites"> Favorites </NavLink>
            <Link to="/register">
              <RegisterButton>Refer A Friend</RegisterButton>
            </Link>
            <Stripe />
            <LoginButton
              onClick={() => {
                this.props.callLogOut(history);
              }}
            >
              Logout
            </LoginButton>
          </HeaderWrapper>
        ) : (
          <HeaderWrapper>
            <NavLink to="/features"> Features </NavLink>{" "}
            <NavLink to="/landing#pricing"> Pricing </NavLink>
            <NavLink to="/about"> About Us </NavLink>
            <Link to="/register">
              <RegisterButton>Register</RegisterButton>
            </Link>
            <LoginButton
              onClick={() => {
                this.props.toggleOverpane(!this.props.overpane);
              }}
            >
              Login
            </LoginButton>
          </HeaderWrapper>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    callLogOut,
    toggleOverpane
  }
)(Header);
