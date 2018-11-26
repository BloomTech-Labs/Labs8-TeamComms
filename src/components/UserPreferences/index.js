import React, { Component } from "react";
import styled from "styled-components";
import { callUpdate } from "../../actions/index";
import { connect } from "react-redux";
import { CustomInput, PrimaryButton } from "../Common";
import Stripe from "../Stripe";

const Main = styled.div`
  padding: 5px 0 5px 0;
  margin: 0 auto;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  color: white;
`;

const Group = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  border: 2px groove white;
  padding: 10px;
  margin: 10px 0;
`;

const CustomInputNew = styled(CustomInput)`
  width: 100%;
  border-radius: 10px;
  margin: 15px 0;
`;

const SaveButton = styled(PrimaryButton)`
  width: 50%;
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

class UserPref extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: "",
      familyName: "",
      displayName: "",
      phoneNumber: "",
      organization: "",
      email: "",
      premium: false,
      notification: ""
    };
  }

  componentDidMount() {
    // Change below to populate the state with current user data
    // This is what the form will use to auto populate
    this.setState({
      givenName: this.props.userData.user.name.givenName,
      familyName: this.props.userData.user.name.familyName,
      displayName: this.props.userData.user.displayName,
      phoneNumber: this.props.userData.user.phoneNumber,
      organization: this.props.userData.user.organization,
      email: this.props.userData.user.email,
      premium: this.props.userData.user.premium,
      notification: this.props.userData.user.notification
    });
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdateSubmit = (e, userInput, history) => {
    e.preventDefault();
    console.log(userInput);
    // this.props.callUpdate(e, userInput, history);
  };

  render() {
    const userInput = {
      givenName: this.state.givenName,
      familyName: this.state.familyName,
      displayName: this.state.displayName,
      phoneNumber: this.state.phoneNumber,
      organization: this.state.organization,
      email: this.state.email,
      premium: this.state.premium,
      notification: this.state.notification,
      curPass: this.state.curPass,
      newPass1: this.state.newPass1,
      newPass2: this.state.newPass2
    };
    let history = this.props.history;
    return (
      <React.Fragment>
        <Main>
          <FormWrapper
            onSubmit={e => {
              this.handleUpdateSubmit(e, userInput, history);
            }}
          >
            <Group>
              <legend>Account Details:</legend>
              <p>First Name: </p>
              <CustomInputNew
                placeholder="first name"
                required
                type="text"
                name="givenName"
                onChange={this.changeHandler}
                value={this.state.givenName}
              />
              <p>Last Name: </p>
              <CustomInputNew
                placeholder="last name"
                required
                type="text"
                name="familyName"
                onChange={this.changeHandler}
                value={this.state.familyName}
              />
              <p>Display Name: </p>
              <CustomInputNew
                placeholder="display name"
                required
                type="text"
                name="displayName"
                onChange={this.changeHandler}
                value={this.state.displayName}
              />
              <p>Phone Number: </p>
              <CustomInputNew
                placeholder="phone number"
                type="text"
                name="phoneNumber"
                onChange={this.changeHandler}
                value={this.state.phoneNumber}
              />
              <p>Organization: </p>
              <CustomInputNew
                placeholder="organization"
                type="text"
                name="organization"
                onChange={this.changeHandler}
                value={this.state.organization}
              />
            </Group>
            <Group>
              <legend>Reminder Preferences:</legend>
              Email
              <CustomInputNew
                placeholder="email address"
                type="text"
                name="email"
                onChange={this.changeHandler}
                value={this.state.email}
              />
              SMS
              <CustomInputNew
                placeholder="phone number"
                type="text"
                name="phoneNumber"
                onChange={this.changeHandler}
                value={this.state.phoneNumber}
              />
              <select
                name="notification"
                onChange={this.changeHandler}
                value={this.state.notification}
              >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
              </select>
              <br />
            </Group>
            <Group>
              <legend>Change Password:</legend>
              <CustomInputNew
                placeholder="current password"
                type="text"
                name="curPass"
                onChange={this.changeHandler}
                value={this.state.curPass}
              />
              <br />
              <CustomInputNew
                placeholder="new password"
                type="text"
                name="newPass1"
                onChange={this.changeHandler}
                value={this.state.newPass1}
              />
              <CustomInputNew
                placeholder="confirm new password"
                type="text"
                name="newPass2"
                onChange={this.changeHandler}
                value={this.state.newPass2}
              />
              <br />
            </Group>
            <SaveButton type="submit"> Save </SaveButton>
            <Group>
              <legend>Premium Preferences:</legend>
              <p>Premium Account: </p>
              <CustomInputNew
                placeholder="email address"
                type="text"
                name="email"
                onChange={this.changeHandler}
                value={this.state.premium}
                readOnly
              />
              <br />
              <Stripe />
            </Group>
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
    callUpdate
  }
)(UserPref);

// Need to have notification preference on user model
// Finalize the update user function(body, axios req)
// Add `style={{ background: "#fabc09" }}` to Stripe button
