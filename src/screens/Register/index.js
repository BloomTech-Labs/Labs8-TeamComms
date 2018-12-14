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
        <Register {...this.props} />
      </React.Fragment>
    );
  }
}
ScreensRegister.propTypes = {};

export default ScreensRegister;
