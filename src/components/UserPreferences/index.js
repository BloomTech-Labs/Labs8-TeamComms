import React, { Component } from "react";
import styled from "styled-components";
import { CustomInput, PrimaryButton } from "../Common";
import Stripe from "../Stripe";

const Main = styled.div`
  padding: 5px 0 5px 0;
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
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
      premium: false
    };
  }
  render() {
    return (
      <React.Fragment>
        <Main>
          <FormWrapper
          // onSubmit={e => {
          //   this.handleNewConvo(e, userInput, history);
          // }}
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
                placeholder="123-456-7890"
                required
                type="number"
                name="phoneNumber"
                onChange={this.changeHandler}
                value={this.state.phoneNumber}
              />
              <p>Organization: </p>
              <CustomInputNew
                placeholder="organization"
                required
                type="text"
                name="organization"
                onChange={this.changeHandler}
                value={this.state.organization}
              />
            </Group>
            <Group>
              <legend>Reminder Preferences:</legend>
              <input type="radio" name="email" value="email" checked /> Email
              <CustomInputNew
                placeholder="email address"
                type="text"
                name="email"
                onChange={this.changeHandler}
                value={this.state.email}
              />
              <input type="radio" name="SMS" value="sms" /> SMS
              <CustomInputNew
                placeholder="phone number"
                type="text"
                name="phoneNumber"
                onChange={this.changeHandler}
                value={this.state.phone}
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

export default UserPref;
