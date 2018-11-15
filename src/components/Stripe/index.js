import React from "react";
import StripeCheckout from "react-stripe-checkout";
import styled from "styled-components";
import { PrimaryButton } from "../Common";
import axios from "axios";

const CustomBtn = styled(PrimaryButton)`
  background: #25bea0;
  color: #ffffff;
  margin-left: 1rem;
  a {
    text-decoration: none;
    color: white;
  }
`;

const Stripe = () => {
  const onToken = token => {
    // Stripe token is generated automatically and passed as props to this function
    // We make an call to an endpoint on our server and send the token
    axios
      .post("http://localhost:3300/api/stripe/payment", { token })
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };
  return (
    <StripeCheckout
      label="Go Premium" //Original button
      name="Team Communicator"
      description="Premium Account"
      panelLabel="Go Premium" //Submit button
      amount={999} //Amount in cents $9.99
      billingAddress={false} //Turn on to collect address *recommended(false for testing)
      allowRememberMe={false}
      token={onToken}
      stripeKey="pk_test_ZU3mlTy0q00DATc9EyF9A8jX"
    >
      <CustomBtn>Go Premium</CustomBtn>
    </StripeCheckout>
  );
};

export default Stripe;
