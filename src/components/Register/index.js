import React, { Component, Fragment } from "react";
import { callReg, toggleOverpane } from "../../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { PrimaryButton, SpinnerWrapper } from "../Common";
import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { Lightbox } from "primereact/lightbox";
import "./css.css";
import { StripeProvider } from "react-stripe-elements";
import Checkout from "../Checkout";

const Main = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100vh;
  // padding: 5px 0 5px 0;
  background: #fff;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;

const StyledMessage = styled(Message)``;

const LandingImage = styled.img`
  max-width: 100%;
  cursor: pointer;
  @media (max-width: 768px) {
    margin-top: 20px;
    max-width: 75%;
  }
`;

const VidContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  transition: all 0.2s ease;
  align-items: center;
  &:hover .playicon {
    opacity: 1;
    color: #25bea0;
  }
`;

const PlayIcon = styled.div`
  position: absolute;
  transition: all 0.2s ease;
  opacity: 0;

  .playicon {
  }
`;

const H2 = styled.h2`
  font-size: 1.75rem;
  padding: 0 10%;
  font-weight: 900;
  text-align: center;
  margin-top: 0;
`;
const Paragraph = styled.p`
  font-size: 1rem;
  padding: 2% 10%;
  line-height: 1.25;
`;

const FormWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  margin: 5%;
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`;
const Group = styled.fieldset`
  transition: 1s;

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;

  background-color: ${props => (props.registerPremium ? "#374353" : "#ffffff")};
  padding: 5%;
  margin: 5%;
  @media (max-width: 768px) {
    width: 80%;
    margin: 0;
    padding: 0 5%;
  }
  > div {
    transform: none;
  }
`;
const NSpan = styled.span`
  margin-top: 20px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const PassInput = styled(Password)`
  width: 100%;
`;

const RegisterButton = styled(PrimaryButton)`
  width: 100%;
  height: 65px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 28px;
  margin-top: 15px;
  margin-bottom: 15px;
  border: none;
`;

const SwitchLink = styled.a`
  color: #25bea0;
  cursor: pointer;
`;
const SwitchText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #facc43;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      givenName: "",
      familyName: "",
      validEmail: false,
      validPassword1: false,
      // validPassword2: true,
      passwordsMatch: false
    };
  }

  switchToLogin = e => {
    this.props.history.push("/login");
  };

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validateEmail = e => {
    if (e.target.value.length > 0 || e.target.blur) {
      // eslint-disable-next-line
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(e.target.value)) {
        this.setState({ email: e.target.value, validEmail: true });
      } else {
        this.setState({ email: e.target.value, validEmail: false });
      }
    } else {
      this.setState({ email: e.target.value, validEmail: false });
    }
  };

  validatePassword1 = e => {
    if (e.target.blur) {
      // eslint-disable-next-line
      var re = /(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[-_.!@#$%^&*])[\w-_.!@#$%^&*]{8,}$/;

      if (re.test(e.target.value)) {
        this.setState({ password1: e.target.value, validPassword1: true });
      } else {
        this.setState({ password1: e.target.value, validPassword1: false });
      }
    } else {
      this.setState({ password1: e.target.value, validPassword1: false });
    }
  };

  // validatePassword2 = e => {
  //   this.setState({ password2: e.target.value });
  //   // e.preventDefault();
  //   // if (e.target.blur) {
  //   //   if (this.state.password1 == this.state.password2) {
  //   //     alert();
  //   //     this.setState({ passwordsMatch: true });
  //   //   }
  //   // }
  // };

  handleRegSubmit = (e, userInput, history, premium) => {
    e.preventDefault();
    if (userInput.password1 === userInput.password2) {
      const credentials = {
        email: userInput.email,
        password: userInput.password1,
        givenName: userInput.givenName,
        familyName: userInput.familyName
      };
      this.props.callReg(e, credentials, history, premium);
    } else {
      e.preventDefault();
      alert("Passwords do not match!");
      return;
    }
  };

  handlePremium = (e, userInput, history) => {
    e.preventDefault();
    if (
      userInput.password1 === userInput.password2 &&
      this.state.validEmail &&
      this.state.validPassword1 &&
      userInput.email &&
      userInput.givenName &&
      userInput.familyName
    ) {
      const credentials = {
        email: userInput.email,
        password: userInput.password1,
        givenName: userInput.givenName,
        familyName: userInput.familyName
      };
      this.props.callReg(e, credentials, history);
    } else {
      e.preventDefault();
      alert("Please check the form for errors.");
      return;
    }
  };

  render() {
    var style = this.props.registerpremium
      ? { transform: "rotateY(-180deg)" }
      : { transform: "rotateY(0)" };
    const userInput = {
      email: this.state.email,
      password1: this.state.password1,
      password2: this.state.password2,
      givenName: this.state.givenName,
      familyName: this.state.familyName
    };

    let history = this.props.history;

    return (
      <React.Fragment>
        {this.props.loginLoading ? (
          <SpinnerWrapper>
            <ProgressSpinner />
          </SpinnerWrapper>
        ) : null}
        <Main>
          <FormWrapper>
            <Lightbox type="content">
              {/* eslint-disable-next-line */}
              <a>
                <VidContainer>
                  <LandingImage src="../images/front1000.png" />

                  <PlayIcon className="playicon">
                    <i className="fas fa-play fa-5x" />
                  </PlayIcon>
                </VidContainer>
              </a>
              <iframe
                title="demo"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/renWQ14-NzI"
                frameBorder="0"
                allowFullScreen
              />
            </Lightbox>

            <H2>Team Communicator keeps your remote team in sync.</H2>
            <Paragraph>
              Schedule zoom meetings, track your priority questions, and
              collaborate on meeting notes in real-time. When your team is light
              years apart, we still keep you connected.
            </Paragraph>
          </FormWrapper>
          <FormWrapper method="post">
            <Group registerPremium={this.props.registerPremium}>
              <br />
              {/* First Name */}
              <NSpan className="">
                <TextInput
                  registerPremium={this.props.registerPremium}
                  id="givenName"
                  name="givenName"
                  required
                  value={this.state.givenName}
                  onChange={this.changeHandler}
                  placeholder="First Name"
                />
              </NSpan>
              <br />
              {/* Last Name */}
              <NSpan className="">
                <TextInput
                  registerPremium={this.props.registerPremium}
                  id="familyName"
                  name="familyName"
                  required
                  value={this.state.familyName}
                  onChange={this.changeHandler}
                  placeholder="Last Name"
                />
              </NSpan>
              <br />
              {/* Email */}
              <NSpan className="">
                <TextInput
                  registerPremium={this.props.registerPremium}
                  name="email"
                  required
                  value={this.state.email}
                  onChange={e => {
                    this.validateEmail(e);
                  }}
                  placeholder="E-mail"
                />
                {!this.state.validEmail && this.state.email.length > 1 ? (
                  <StyledMessage
                    className={this.props.className}
                    registerPremium={this.props.registerPremium}
                    severity="error"
                    text="Enter a valid e-mail address."
                  />
                ) : this.state.validEmail && this.state.email.length > 1 ? (
                  <StyledMessage
                    style={this.props.className}
                    className={this.props.className}
                    registerPremium={this.props.registerPremium}
                    severity="success"
                  />
                ) : null}
              </NSpan>

              {this.props.regError ? (
                <Message
                  registerPremium={this.props.registerPremium}
                  severity="error"
                  text="This email address is already registered."
                />
              ) : null}
              <br />
              {/* Password 1 */}
              <NSpan registerPremium={this.props.registerPremium} className="">
                <PassInput
                  registerPremium={this.props.registerPremium}
                  id="password1"
                  name="password1"
                  required
                  value={this.state.password1}
                  onChange={e => {
                    this.validatePassword1(e);
                  }}
                  placeholder="Password"
                />
                {this.state.validPassword1 ? (
                  <Message
                    className={this.props.className}
                    registerPremium={this.props.registerPremium}
                    severity="success"
                  />
                ) : !this.state.validPassword1 &&
                this.state.password2.length > 0 ? (
                  <Fragment>
                    <Message
                      className={this.props.className}
                      registerPremium={this.props.registerPremium}
                      severity="error"
                      text="Password Requirements Not Met:"
                      style={{ transform: "none" }}
                    />
                    <br />
                    <Message
                      className={this.props.className}
                      registerPremium={this.props.registerPremium}
                      severity="warn"
                      text="Minimum Length is 8 characters."
                      style={{ transform: "none" }}
                    />
                    <br />
                    <Message
                      registerPremium={this.props.registerPremium}
                      severity="warn"
                      text="1 Uppercase Letter."
                      style={{ transform: "none" }}
                    />
                    <br />
                    <Message
                      registerPremium={this.props.registerPremium}
                      severity="warn"
                      text="1 Lowercase Letter."
                    />
                    <br />
                    <Message
                      id="number1"
                      registerPremium={this.props.registerPremium}
                      severity="warn"
                      text="1 Number."
                    />
                    <br />
                    <StyledMessage
                      registerPremium={this.props.registerPremium}
                      severity="warn"
                      text="1 Special Character ( - _ . ! @ # $ % ^ & * ).  "
                    />
                  </Fragment>
                ) : null}
              </NSpan>
              <br />
              {/* Password 2 */}
              <NSpan className="">
                <PassInput
                  registerPremium={this.props.registerPremium}
                  feedback={false}
                  id="password2"
                  name="password2"
                  required
                  value={this.state.password2}
                  onChange={e => {
                    // this.validatePassword2(e);
                    this.setState({ password2: e.target.value });
                  }}
                  placeholder="Confirm Password"
                />

                {this.state.validPassword1 &&
                this.state.password1 !== this.state.password2 &&
                this.state.password2.length > 0 ? (
                  <StyledMessage
                    severity="error"
                    text="Passwords don't match!"
                  />
                ) : this.state.validPassword1 &&
                this.state.password1 !== this.state.password2 ? (
                  <StyledMessage text="Please confirm your password." />
                ) : this.state.validPassword1 &&
                this.state.password1 === this.state.password2 &&
                this.state.password2.length > 0 ? (
                  <StyledMessage severity="success" text="Match!" />
                ) : null}
              </NSpan>
              <br />
              {this.props.registerPremium ? (
                <Checkout userInput={userInput} callReg={this.props.callReg} />
              ) : (
                <RegisterButton
                  onClick={e => {
                    this.handleRegSubmit(e, userInput, history);
                  }}
                >
                  Register
                </RegisterButton>
              )}
            </Group>

            <SwitchText>
              Already Registered ?
              {/* <SwitchLink onClick={this.switchToLogin}>
                &nbsp; Login.
              </SwitchLink> */}
              <SwitchLink
                onClick={() => {
                  this.props.toggleOverpane(!this.props.overpane);
                }}
              >
                &nbsp; Login.
              </SwitchLink>
            </SwitchText>
          </FormWrapper>
        </Main>
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
    callReg,
    toggleOverpane
  }
)(Register);

// <RegisterPremium
//   registerPremium={this.props.registerPremium}
//   id="registerPremium"
//   onClick={e => {
//     this.handleRegSubmit(e, userInput, history);
//   }}
// >
//   Get Premium
// </RegisterPremium>
