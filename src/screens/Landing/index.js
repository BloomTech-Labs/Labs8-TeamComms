import React, { Component } from "react";
import Register from "../../components/Register";
import styled from "styled-components";
import Stripe from "../../components/Stripe";
import PrimaryButton from "../../components/Common/PrimaryButton";
import history from "../../history";
import "./landing.css";

//this screen should return components necessary to build the landing page.

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PickPlanButton = styled(PrimaryButton)`
  background: #facc43;
  width: 300px;
  cursor: pointer;
  z-index: 1000;
  font-size: 20px;
  font-weight: bold;
  color: #374353;
  :hover {
    color: #25bea0;
  }
`;

const Masthead = styled.div`
  background: url(images/masthead.png) no-repeat center center scroll;
  background-size: cover;

  height: 90vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-bottom: 17%;
  padding-left: 5%;
  max-width: 100%;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  @media (max-width: 1100px) {
    background-size: contain;
    height: 80vh;
  }
  @media (max-width: 768px) {
    background-size: contain;
    height: 40vh;
  }
`;

class ScreensLanding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerPremium: false
    };
  }

  setPremium = () => {
    this.setState({ registerPremium: true });
  };

  setFree = () => {
    this.setState({ registerPremium: false });
  };

  render(props) {
    return (
      <React.Fragment>
        <Masthead>
          <a href="#plans">
            <PickPlanButton>Create your Free Account</PickPlanButton>
          </a>
        </Masthead>
        <Main>
          <div id="plans" className="background">
            <div className="container">
              <div className="panel pricing-table">
                <div className="pricing-plan">
                  <i className="fas fa-user fa-8x" />
                  <h2 className="pricing-header">Personal</h2>
                  <ul className="pricing-features">
                    <li className="pricing-features-item">
                      Create and Manage up to five meetings/month
                    </li>
                    <li className="pricing-features-item strikeout">
                      Create Zoom Meetings
                    </li>
                    <li className="pricing-features-item">
                      Collaborate on notes in real-time
                    </li>
                    <li className="pricing-features-item">
                      Track your meeting questions
                    </li>
                  </ul>
                  <span className="pricing-price">Free</span>
                  <a
                    href="#register"
                    className="pricing-button"
                    onClick={this.setFree}
                  >
                    Get Started
                  </a>
                </div>

                <div className="pricing-plan">
                  <i className="fas fa-user-astronaut fa-8x" />
                  <h2 className="pricing-header">Professional</h2>
                  <ul className="pricing-features">
                    <li className="pricing-features-item">
                      Create and Manage <br />
                      <span style={{ color: "#25BEA0" }}>unlimited</span>{" "}
                      meetings
                    </li>
                    <li className="pricing-features-item">
                      Create Zoom Meetings
                    </li>
                    <li className="pricing-features-item">
                      Collaborate on notes in real-time
                    </li>
                    <li className="pricing-features-item">
                      Track your meeting questions
                    </li>
                  </ul>
                  <span className="pricing-price">$19.99/month</span>
                  <a
                    href="#register"
                    className="pricing-button is-featured"
                    onClick={this.setPremium}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Main>
        <Register
          registerPremium={this.state.registerPremium}
          {...this.props}
        />
        <div id="register" />
      </React.Fragment>
    );
  }
}
ScreensLanding.propTypes = {};

export default ScreensLanding;
