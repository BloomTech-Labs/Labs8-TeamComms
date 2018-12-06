import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { PrimaryButton, BurgerButton, NavLink } from "../Common";
import Stripe from "../Stripe";
import {
  callLogOut,
  toggleOverpane,
  toggleMobileMenu
} from "../../actions/index";
import history from "../../history";

const TextLink = styled(Link)`
  @media (min-width: 800px) {
    margin-right: 10px;
    text-align: center;
    color: white;
    &:hover {
      color: lightgrey;
    }
  }
`;

export const MenuLink = styled.p`
  font-size: 1rem;
  text-decoration: none;
  color: #ffffff;
  cursor: pointer;
  text-align: center;
  @media (min-width: 800px) {
    margin-right: 10px;
    color: white;
    &:hover {
      color: lightgrey;
    }
  }
`;

const HeaderWrapper = styled.div`
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

const Main = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    height: 6rem;
    align-items: center;
    justify-content: flex-end;
    grid-column: 2;
    grid-row: 1;
  }
`;

const MobileMain = styled.div`
  @media (min-width: 320px) {
    display: flex;
    height: 5rem;
    align-items: center;
    justify-content: center;
    grid-column: 2;
    grid-row: 1;
  }
  @media (min-width: 500px) {
    margin-right: 0px;
  }
  @media (min-width: 1023px) {
    display: none;
  }
`;

const RegisterButton = styled(PrimaryButton)`
  background: #25bea0;
  color: #ffffff;
  a {
    text-decoration: none;
    color: white;
  }
  margin: 0 auto;
`;

const MenuOverpane = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #25bea0;
  padding: 2rem;
  z-index: 1000;
  transition: 250ms cubic-bezier(0.7, 0, 0.3, 1) transform;
  transform: translateY(${props => (props.overpane ? "100%" : "0")});
`;

const LoginButton = styled(PrimaryButton)`
  background: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  width: 100px;
  margin: 0 auto;
  a {
    text-decoration: none;
    color: white;
  }
  @media (min-width: 1024px) {
    margin: 0 1rem 0 1rem;
  }
`;

// const HeaderText = styled.h1`
//   pointer-events: none;
//   position: absolute;
//   margin: 0;
//   left: 50%;
//   width: 20rem;
//   margin-left: -10rem;
//   font-size: 1rem;
//   text-align: center;
// `;

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMenu: false
    };
  }
  // LogOut = () => {
  //   this.props.callLogOut(this.props.history);
  // };

  render() {
    console.log("header history object", history);

    return (
      <Fragment>
        <MobileMain>
          <BurgerButton
            onClick={() => {
              this.props.toggleMobileMenu(!this.props.mobileMenu);
            }}
          >
            <i className="fas fa-bars" />
          </BurgerButton>
          {this.props.mobileMenu ? (
            <MenuOverpane>
              {this.props.loginSuccess ? (
                <Fragment>
                  <MenuLink
                    onClick={() => {
                      this.props.toggleMobileMenu(
                        !this.props.mobileMenu,
                        "/dashboard"
                      );
                    }}
                  >
                    DASHBOARD
                  </MenuLink>

                  <NavLink
                    onClick={() => {
                      this.props.toggleMobileMenu(
                        !this.props.mobileMenu,
                        "/preferences"
                      );
                    }}
                  >
                    PREFERENCES
                  </NavLink>
                  {/* <Link to="/register">
                    <RegisterButton>REFER A FRIEND </RegisterButton>
                  </Link> */}
                  {this.props.userData.user.premium ? null : <Stripe />}
                  <LoginButton
                    onClick={() => {
                      this.props.callLogOut(history);
                    }}
                  >
                    Logout
                  </LoginButton>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink
                    onClick={() => {
                      this.props.toggleMobileMenu(
                        !this.props.mobileMenu,
                        "/features"
                      );
                    }}
                  >
                    FEATURES
                  </NavLink>
                  <Link to="/landing#pricing"> PRICING </Link>
                  <Link to="/about"> ABOUT US </Link>
                  <Link to="/register">
                    <LoginButton> REGISTER </LoginButton>
                  </Link>
                  <LoginButton
                    onClick={() => {
                      this.props.toggleOverpane(!this.props.overpane);
                    }}
                  >
                    Login
                  </LoginButton>
                </Fragment>
              )}
            </MenuOverpane>
          ) : null}
        </MobileMain>

        <Main>
          {this.props.loginSuccess ? (
            <HeaderWrapper>
              <NavLink
                onClick={() => {
                  this.props.toggleMobileMenu(
                    this.props.mobileMenu,
                    "/dashboard"
                  );
                }}
              >
                DASHBOARD
              </NavLink>
              <TextLink to="/preferences">PREFERENCES</TextLink>
              <Link to="/register">
                <RegisterButton>REFER A FRIEND </RegisterButton>
              </Link>
              {this.props.userData.user.premium ? null : <Stripe />}
              <LoginButton
                onClick={() => {
                  this.props.callLogOut(history);
                }}
              >
                LOGOUT
              </LoginButton>
            </HeaderWrapper>
          ) : (
            <HeaderWrapper>
              {/* <NavLink to="/features">FEATURES</NavLink>
              <NavLink to="/landing#pricing">PRICING</NavLink>
              <NavLink to="/about">ABOUT US</NavLink> */}
              <Link to="/register">
                <RegisterButton>REGISTER</RegisterButton>
              </Link>
              <LoginButton
                onClick={() => {
                  this.props.toggleOverpane(!this.props.overpane);
                }}
              >
                LOGIN
              </LoginButton>
            </HeaderWrapper>
          )}
        </Main>
      </Fragment>
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
    toggleOverpane,
    toggleMobileMenu
  }
)(Header);
