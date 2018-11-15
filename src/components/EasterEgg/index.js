import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

let randomNumber = Math.floor(Math.random() * 8);
console.log(randomNumber);

const spacePuns = [
  ["How does earth become clean?", "It takes a meteor shower."],
  [
    "What is a light year?",
    "The same as a regular year, but with less calories"
  ],
  ["What did the astronaut cook for lunch?", "An unidentified frying object."],
  [
    "Why did you guys laugh at my space puns?",
    "Because they are way too Sirius"
  ],
  ["What did the boy star say to the girl star?", "I really glow for you."],
  [
    "What should you does if you see an aggressive alien?",
    "Give it some space."
  ],
  ["What should you do if you see an green alien?", "Wait until it's ripe."],
  ["Why did the star get arrested?", "Because it was a shooting star."],
  ["If athletes get 'Athletes foot' what do astronauts get?", "Missile Toe."][
    ("How do you know when the moon is gone my broke?",
    "When it's down to it's last quarter.")
  ],
  [
    "Did you hear about the bones on the moon?",
    "Looks like the cow didn't make it after all."
  ],
  [
    "Why isn't Jupiter ever invited to space parties?",
    "He always has too much gas…"
  ]
];

const EggWrapper = styled.div`
  grid-column: 1/3;
  grid-row: 1;
  display: flex;
  background: #374353;
  border-top: 1px solid grey;
  align-items: center;
  justify-content: center;
  color: lightgrey;
  p {
    color: grey;
    font-style: italic;
  }
`;

const DisplayName = styled.span`
  font-weight: bold;
  color: #fabc09;
`;

class EasterEgg extends Component {
  render() {
    let newRandom = randomNumber;
    return (
      <EggWrapper>
        Welcome,&nbsp;
        <DisplayName>
          {this.props.userData.user ? this.props.userData.user.displayName : ""}
        </DisplayName>
        &nbsp;
        {spacePuns[newRandom][0]} &nbsp; <p>{spacePuns[newRandom][1]}</p>
      </EggWrapper>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(EasterEgg);
