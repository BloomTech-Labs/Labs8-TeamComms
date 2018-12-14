import React from "react";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import { premiumChange } from "../../actions/index";
import { connect } from "react-redux";
import { PrimaryButton } from "../Common";
import axios from "axios";

const CustomBtn = styled(PrimaryButton)`
  background: #fabc09;
  color: #ffffff;
  a {
    text-decoration: none;
    color: white;
  }
`;

const Stripe = props => {
  const onToken = token => {
    // Stripe token is generated automatically and passed as props to this function
    // We make an call to an endpoint on our server and send the token
    axios
      .post("https://teamcomm2.herokuapp.com/api/stripe/payment", { token })
      .then(response => {
        props.premiumChange();
        alert("Payment Success");
      })
      .catch(error => {
        alert("Payment Error");
      });
  };
  return (
    <StripeCheckout
      label="Go Premium" //Original button
      name="Team Communicator"
      description="Use same email as Team Comm acct"
      panelLabel="Go Premium" //Submit button
      amount={1999} //Amount in cents $19.99
      billingAddress={false} //Turn on to collect address *recommended(false for testing)
      allowRememberMe={false}
      token={onToken}
      stripeKey="pk_test_ZU3mlTy0q00DATc9EyF9A8jX"
    >
      <CustomBtn>Go Premium</CustomBtn>
    </StripeCheckout>
  );
};

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  {
    premiumChange
  }
)(Stripe);
