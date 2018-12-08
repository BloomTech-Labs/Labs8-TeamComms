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
  background-color: white;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 15px;
  background-color: white;
`;
const Group = styled.fieldset`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  border: 2px groove white;
  border-radius: 5px;
  padding: 0 10px;
  margin: 10px auto;
  background: white;
  legend {
    padding: 8px;
  }
`;
const NewSpan = styled.span`
  margin: 25px 0;
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

const NewDropdown = styled(Dropdown)`
  margin-bottom: 25px;
`;

const SaveButton = styled(PrimaryButton)`
  width: 50%;
  height: 50px;
  color: white;
  border-radius: 5px;
  background: #25bea0;
  border: 1px solid grey;
  font-size: 1.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: none;
`;
const Spacer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 25px;
`;

class UserPref extends Component {
  constructor(props) {
    super(props);
    this.state = {
      givenName: "",
      familyName: "",
      displayName: "",
      phone_number: "",
      organization: "",
      email: "",
      premium: false,
      notificationPref: "",
      oldPw: "",
      newPw: "",
      newPw2: ""
    };
  }

  componentDidMount() {
    // Change below to populate the state with current user data
    // This is what the form will use to auto populate
    this.setState({
      givenName: this.props.userData.user.name.givenName,
      familyName: this.props.userData.user.name.familyName,
      displayName: this.props.userData.user.displayName,
      phone_number: this.props.userData.user.phone_number || "",
      organization: this.props.userData.user.organization,
      email: this.props.userData.user.email,
      premium: this.props.userData.user.premium,
      notificationPref: this.props.userData.user.notificationPref || "email",
      oldPw: "",
      newPw: "",
      newPw2: ""
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
    if (userInput.notificationPref === undefined) {
      alert("Please choose notification type");
      return;
    }
    if (!userInput.oldPw && !userInput.newPw) {
      // If no changes to password remove field from userInput
      delete userInput.oldPw;
      delete userInput.newPw;
      this.props.callUpdate(e, userInput, history);
    } else if (userInput.newPw !== userInput.newPw2) {
      // If passwords dont match alert user
      alert("New passwords do not match");
    } else {
      this.props.callUpdate(e, userInput, history);
      this.this.setState({ oldPw: "", newPw: "", newPw2: "" });
    }
  };

  render() {
    const userInput = {
      name: {
        givenName: this.state.givenName,
        familyName: this.state.familyName
      },
      displayName: this.state.displayName,
      phone_number: this.state.phone_number,
      organization: this.state.organization,
      email: this.state.email,
      notificationPref: this.state.notificationPref,
      oldPw: this.state.oldPw,
      newPw: this.state.newPw,
      newPw2: this.state.newPw2
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
              {/* First Name */}
              <NewSpan className="p-float-label">
                <TextInput
                  id="givenName"
                  name="givenName"
                  required
                  value={this.state.givenName}
                  onChange={this.changeHandler}
                />
                <label htmlFor="givenName">First Name</label>
              </NewSpan>
              {/* Last Name */}
              <NewSpan className="p-float-label">
                <TextInput
                  id="familyName"
                  name="familyName"
                  required
                  value={this.state.familyName}
                  onChange={this.changeHandler}
                />
                <label htmlFor="familyName">Last Name</label>
              </NewSpan>
              {/* Display Name */}
              <NewSpan className="p-float-label">
                <TextInput
                  id="displayName"
                  name="displayName"
                  required
                  value={this.state.displayName}
                  onChange={this.changeHandler}
                />
                <label htmlFor="displayName">Display Name</label>
              </NewSpan>
              {/* Phone Number */}
              <NewSpan className="p-float-label">
                <MaskInput
                  id="phoneNumber"
                  name="phone_number"
                  mask="(999) 999-9999"
                  value={this.state.phone_number}
                  onChange={this.changeHandler}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </NewSpan>
              {/* Organization */}
              <NewSpan className="p-float-label">
                <TextInput
                  id="organization"
                  name="organization"
                  value={this.state.organization}
                  onChange={this.changeHandler}
                />
                <label htmlFor="organization">Organization</label>
              </NewSpan>
            </Group>
            <Group>
              <legend>Reminder Preferences:</legend>
              {/* Email */}
              <NewSpan className="p-float-label">
                <TextInput
                  id="email"
                  name="email"
                  required
                  value={this.state.email}
                  onChange={this.changeHandler}
                />
                <label htmlFor="email">Email</label>
              </NewSpan>
              {/* SMS */}
              <NewSpan className="p-float-label">
                <MaskInput
                  id="phoneNumber"
                  name="phone_number"
                  mask="(999) 999-9999"
                  value={this.state.phone_number}
                  onChange={this.changeHandler}
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </NewSpan>
              {/* Notification Pref */}
              <NewDropdown
                id="notify"
                name="notificationPref"
                required
                value={this.state.notificationPref}
                options={notifyItems}
                placeholder="Select"
                onChange={e => {
                  this.setState({ notificationPref: e.value });
                }}
              />
            </Group>
            <Group>
              <legend>Change Password:</legend>
              {/* Current Password */}
              <NewSpan className="p-float-label">
                <PassInput
                  id="curPass"
                  name="oldPw"
                  value={this.state.oldPw}
                  onChange={this.changeHandler}
                />
                <label htmlFor="curPass">Current Password</label>
              </NewSpan>
              {/* New Password 1 */}
              <NewSpan className="p-float-label">
                <PassInput
                  id="newPass1"
                  name="newPw"
                  value={this.state.newPw}
                  onChange={this.changeHandler}
                />
                <label htmlFor="newPass1">New Password</label>
              </NewSpan>
              {/* New Password 2 */}
              <NewSpan className="p-float-label">
                <PassInput
                  id="newPass2"
                  name="newPw2"
                  value={this.state.newPw2}
                  onChange={this.changeHandler}
                />
                <label htmlFor="newPass2">Confirm New Password</label>
              </NewSpan>
            </Group>
            <SaveButton type="submit"> Save </SaveButton>
          </FormWrapper>
          <Group>
            <legend>Premium Preferences:</legend>
            {/* Account Type */}
            <NewSpan className="p-float-label">
              <TextInput
                id="premium"
                name="premium"
                value={this.state.premium ? "Premium" : "Standard"}
                onChange={() => {
                  alert('Use "Go Premium" button below');
                }}
              />
              <label htmlFor="premium">Account Type</label>
            </NewSpan>
            {this.props.userData.user.premium ? null : (
              <Spacer>
                <Stripe />
              </Spacer>
            )}
          </Group>
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
