import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class Stripe extends Component {
  onToken = token => {
    // Stripe token is generated automatically and passed as props to this function
    const body = JSON.stringify(token);
    // We make an call to an endpoint on our server and send the token
    axios
      .post("/api/stripe/payment", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Error");
      });
  };

  render() {
    return (
      <StripeCheckout
        label="Go Premium" //Original button
        name="Team Communicator"
        description="Premium Account"
        panelLabel="Go Premium" //Submit button
        amount={1499} //Amount in cents $14.99
        billingAddress={false} //Turn on to collect address *recommended(false for testing)
        allowRememberMe={false}
        token={this.onToken}
        stripeKey="pk_test_ZU3mlTy0q00DATc9EyF9A8jX"
      />
    );
  }
}

export default Stripe;
