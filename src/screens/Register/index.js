import React, { Component } from "react";
import Register from "../../components/Register";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

//this screen should return components necessary to build the landing page.

class ScreensRegister extends Component {
  render(props) {
    return (
      <React.Fragment>
        <Main>
          <div class="background">
            <div class="container">
              <div class="panel pricing-table">
                <div class="pricing-plan">
                  <img
                    src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
                    alt=""
                    class="pricing-img"
                  />
                  <h2 class="pricing-header">Personal</h2>
                  <ul class="pricing-features">
                    <li class="pricing-features-item">Custom domains</li>
                    <li class="pricing-features-item">
                      Sleeps after 30 mins of inactivity
                    </li>
                  </ul>
                  <span class="pricing-price">Free</span>
                  <a href="#/" class="pricing-button">
                    Sign up
                  </a>
                </div>

                <div class="pricing-plan">
                  <img
                    src="https://s28.postimg.cc/ju5bnc3x9/plane.png"
                    alt=""
                    class="pricing-img"
                  />
                  <h2 class="pricing-header">Small team</h2>
                  <ul class="pricing-features">
                    <li class="pricing-features-item">Never sleeps</li>
                    <li class="pricing-features-item">
                      Multiple workers for more powerful apps
                    </li>
                  </ul>
                  <span class="pricing-price">$150</span>
                  <a href="#/" class="pricing-button is-featured">
                    Free trial
                  </a>
                </div>

                <div class="pricing-plan">
                  <img
                    src="https://s21.postimg.cc/tpm0cge4n/space-ship.png"
                    alt=""
                    class="pricing-img"
                  />
                  <h2 class="pricing-header">Enterprise</h2>
                  <ul class="pricing-features">
                    <li class="pricing-features-item">Dedicated</li>
                    <li class="pricing-features-item">
                      Simple horizontal scalability
                    </li>
                  </ul>
                  <span class="pricing-price">$400</span>
                  <a href="#/" class="pricing-button">
                    Free trial
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Main>

        <Register {...this.props} />
      </React.Fragment>
    );
  }
}
ScreensRegister.propTypes = {};

export default ScreensRegister;
