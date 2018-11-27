import React, { Component } from "react";
import styled from "styled-components";
import { callUpdate } from "../../actions/index";
import { connect } from "react-redux";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { PrimaryButton } from "../Common";
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

const TextInput = styled(InputText)`
  width: 100%;
`;
const MaskInput = styled(InputMask)`
  width: 100%;
`;
const PassInput = styled(Password)`
  width: 100%;
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
      notification: "email"
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
    const notifyItems = [
      { label: "Email", value: "email" },
      { label: "SMS", value: "sms" }
    ];
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
              <br />
              {/* First Name */}
              <span className="p-float-label">
                <TextInput
                  id="givenName"
                  name="givenName"
                  required
                  value={this.state.givenName}
                  onChange={this.changeHandler}
                />
                <label htmlFor="givenName">First Name</label>
              </span>
              <br />
              {/* Last Name */}
              <span className="p-float-label">
                <TextInput
                  id="familyName"
                  name="familyName"
                  required
                  value={this.state.familyName}
                  onChange={this.changeHandler}
                />
                <label htmlFor="familyName">Last Name</label>
              </span>
              <br />
              {/* Display Name */}
              <span className="p-float-label">
                <TextInput
                  id="displayName"
                  name="displayName"
                  required
                  value={this.state.displayName}
                  onChange={this.changeHandler}
                />
                <label htmlFor="displayName">Display Name</label>
              </span>
              <br />
              {/* Phone Number */}
              <span className="p-float-label">
                <MaskInput
                  id="phoneNumber"
                  name="phoneNumber"
                  mask="(999) 999-9999"
                  value={this.state.phoneNumber}
                  onChange={this.changeHandler}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </span>
              <br />
              {/* Organization */}
              <span className="p-float-label">
                <TextInput
                  id="organization"
                  name="organization"
                  value={this.state.organization}
                  onChange={this.changeHandler}
                />
                <label htmlFor="organization">Organization</label>
              </span>
            </Group>
            <Group>
              <legend>Reminder Preferences:</legend>
              <br />
              {/* Email */}
              <span className="p-float-label">
                <TextInput
                  id="email"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={this.changeHandler}
                />
                <label htmlFor="email">Email</label>
              </span>
              <br />
              {/* SMS */}
              <span className="p-float-label">
                <MaskInput
                  id="phoneNumber"
                  name="phoneNumber"
                  mask="(999) 999-9999"
                  value={this.state.phoneNumber}
                  onChange={this.changeHandler}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </span>
              <br />
              {/* Notification Pref */}
              <Dropdown
                id="notify"
                name="notification"
                required
                value={this.state.notification}
                options={notifyItems}
                placeholder="Select"
                onChange={e => {
                  this.setState({ notification: e.value });
                }}
              />
            </Group>
            <Group>
              <legend>Change Password:</legend>
              <br />
              {/* Current Password */}
              <span className="p-float-label">
                <PassInput
                  id="curPass"
                  name="curPass"
                  value={this.state.curPass}
                  onChange={this.changeHandler}
                />
                <label htmlFor="curPass">Current Password</label>
              </span>
              <br />
              {/* New Password 1 */}
              <span className="p-float-label">
                <PassInput
                  id="newPass1"
                  name="newPass1"
                  value={this.state.newPass1}
                  onChange={this.changeHandler}
                />
                <label htmlFor="newPass1">New Password</label>
              </span>
              <br />
              {/* New Password 2 */}
              <span className="p-float-label">
                <PassInput
                  id="newPass2"
                  name="newPass2"
                  value={this.state.newPass2}
                  onChange={this.changeHandler}
                />
                <label htmlFor="newPass2">Confirm New Password</label>
              </span>
            </Group>
            <SaveButton type="submit"> Save </SaveButton>
            <Group>
              <legend>Premium Preferences:</legend>
              <br />
              {/* Account Type */}
              <span className="p-float-label">
                <TextInput
                  id="premium"
                  name="premium"
                  value={this.state.premium ? "Premium" : "Standard"}
                  onChange={() => {
                    alert('Use "Go Premium" button below');
                  }}
                />
                <label htmlFor="premium">Account Type</label>
              </span>
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
