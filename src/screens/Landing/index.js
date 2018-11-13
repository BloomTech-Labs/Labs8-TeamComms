import React, {
  Component
} from "react";
import Register from "../../components/Register";
import styled from "styled-components";
import PropTypes from "prop-types";

//this screen should return components necessary to build the landing page.

const StyledGrid = styled.div `
  display: grid;
  grid-template-columns: 30rem auto;
  grid-template-rows: auto auto;
`;

const JumboTron = styled.div `
  font-size: 3rem;
  line-height: 1.25;
  grid-column: 1;
  grid-row: 1;
  margin: 1rem 3rem 3rem 3rem;

  font-weight: bold;
  color: #facc43;
  p {
    color: #ffffff;
    font-size: 1rem;
    font-weight: normal;
    margin-top: 1rem;
  }
`;

const LittleP = styled.p `
  font-style: italic;
  font-size: 0.25rem;
  text-align: center;
  opacity: 0.25;
  margin: 0;
  padding: 0;
  color: #facc43;
`;

const LandingImage = styled.img `
  grid-column: 2;
  grid-row: 1;
  max-width: 1000px;
`;

const Ul = styled.ul `
  width: 18rem;
  margin-left: 2rem;
`;
const Li = styled.li `
  font: 200 1rem/1.5 Helvetica, Verdana, sans-serif;
  border-bottom: 1px solid #ccc;
  margin: 1rem;
  transition: background-color 0.3s ease;

  :hover {
    background-color: #25bea0;
    p {
      opacity: 1;
    }
  }
  :last-child {
    border: none;
  }
`;

const Email = styled.input `
  width: 300px;
  height: 50px;
  font-size: 20px;
  color: #323232;
  text-align: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const RegisterButton = styled.button `
  width: 75px;
  height: 50px;
  color: white;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 20px;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const StyledMiniForm = styled.form `
  margin-top: 2rem;
  display: flex;
  align-items: center;
  margin-bottom: 0;
`;

class ScreensLanding extends Component {
  render() {
    return ( <
      StyledGrid >
      <
      JumboTron >
      Your Remote Meetings Just Got Easier. <
      p >
      Team Communicator helps keep your remote team stay in sync by managing your meetings in the cloud. <
      br / >
      <
      br / >
      <
      Ul >
      <
      Li > Track your Team 's Questions</Li> <
      Li > Upload Directly to Youtube < /Li> <
      Li > Quickly Transcribe Your Video 's</Li> <
      Li > Send Transcription 's Via E-Mail</Li> < /
      Ul > <
      /p> <
      StyledMiniForm action = "" >
      <
      Email placeholder = "e-mail"
      required type = "text"
      name = "username" / >
      <
      RegisterButton > GO! < /RegisterButton> < /
      StyledMiniForm > <
      LittleP > 14 - Day Free Trial.No Credit Card Required. < /LittleP> < /
      JumboTron > <
      LandingImage src = "./images/landingimage2.jpg" / >
      <
      /StyledGrid>
    );
  }
}
ScreensLanding.propTypes = {};

export default ScreensLanding;