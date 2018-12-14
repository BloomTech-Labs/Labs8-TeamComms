import React, { Component } from "react";
// import { ProgressSpinner } from "primereact/progressspinner";
import { Message } from "primereact/message";
import { connect } from "react-redux";
import styled from "styled-components";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import history from "../../history";
import {
  PrimaryButton,
  Overpane,
  CloseButton,
  LoginLogo,
  SpinnerWrapper
} from "../Common";
import GoogleButton from "../GoogleButton";
import { callLogIn, toggleOverpane } from "../../actions/index";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0 5px 0;
  width: 360px;
  margin: 100px auto;
  z-index: 2000;
  padding: 20px;
  background: #ffffff;
  @media (max-width: 400px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const Text = styled.span`
  text-align: center;
  color: #374353;
  margin-bottom: 12px;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 24px auto 12px;
`;

const TextInput = styled(InputText)`
  width: 100%;
`;
const PassInput = styled(Password)`
  width: 100%;
`;
const NSpan = styled.span`
  width: 100%;
  margin-top: 10px;
`;

const LoginButton = styled(PrimaryButton)`
  width: 300px;
  height: 75px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 28px;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validEmail: false
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogInSubmit = (e, userInput, history, overpane) => {
    this.props.callLogIn(e, userInput, history, overpane);
  };

  showError = () => {
    this.messages.show({
      severity: "error",
      summary: "Error Message",
      detail: "Username or Password Incorrect."
    });
  };

  validateEmail = e => {
    if (e.target.value.length > 0 || e.target.blur) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(e.target.value)) {
        this.setState({ email: e.target.value, validEmail: true });
      } else {
        this.setState({ email: e.target.value, validEmail: false });
      }
    // below edge case that is never hit
    } else {
      this.setState({ email: e.target.value, validEmail: false });
    }
  };

  render() {
    let userInput = {
      email: this.state.email,
      password: this.state.password
    };
    const overpane = !this.props.overpane;

    return (
      <Overpane
        history={history}
        overpane={overpane}
        onClick={e => {
          this.props.toggleOverpane(!this.props.overpane);
        }}
      >
        {this.props.loginLoading ? (
          <SpinnerWrapper>
            {/* commented below out due to double spinner */}
            {/* <ProgressSpinner /> */}
          </SpinnerWrapper>
        ) : null}
        <Main onClick={event => event.stopPropagation()}>
          <CloseButton
            onClick={e => {
              this.props.toggleOverpane(!this.props.overpane);
            }}
          >
            <i className="fas fa-times" />
          </CloseButton>
          <LoginLogo img src="../images/logo.png" />
          <FormWrapper
            method="post"
            onSubmit={e => {
              this.handleLogInSubmit(
                e,
                userInput,
                history,
                !this.props.overpane
              );
            }}
          >
            {this.props.loginError ? (
              <Message
                severity="error"
                text="Username or Password Incorrect."
              />
            ) : null}
            <br />
            {/* Email */}
            <NSpan className="">
              <TextInput
                id="email"
                name="email"
                required
                value={this.state.email} // onChange={this.changeHandler}
                placeholder="E-mail"
                onChange={e => {
                  this.validateEmail(e);
                }}
              />
              {!this.state.validEmail && this.state.email.length > 0 ? (
                <Message
                  severity="error"
                  text="Enter a valid e-mail address."
                />
              ) : null}
            </NSpan>
            <br />
            {/* Password */}
            <NSpan className="">
              <PassInput
                id="password"
                name="password"
                required
                feedback={false}
                value={this.state.password}
                onChange={this.changeHandler}
                placeholder="Password"
              />
            </NSpan>
            <br />
            <LoginButton type="submit">Log In</LoginButton>
            <Text>Forgot Your Password?</Text>
          </FormWrapper>
          <Text>- or -</Text>
          <GoogleButton history={history} />
        </Main>
      </Overpane>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(
  mapStateToProps,
  {
    callLogIn,
    toggleOverpane
  }
)(Login);
