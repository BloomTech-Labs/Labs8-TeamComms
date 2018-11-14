import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

class Stripe extends Component {
  onToken = token => {
    const body = JSON.stringify(token);
    // Update the endpoint below to our correct server endpoint
    axios
      .post("/api/stripe/charge", body)
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
        name="Team Communicator"
        description="Premium Account"
        token={this.onToken}
        stripeKey="pk_test_ZU3mlTy0q00DATc9EyF9A8jX"
      />
    );
  }
}

export default Stripe;
