import React, { Component } from "react";
import {
  CardElement,
  injectStripe,
  StripeProvider,
  Elements
} from "react-stripe-elements";
import history from "../../history";

// You can customize your Elements to give it the look and feel of your site.
const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "Open Sans, sans-serif",
        letterSpacing: "0.025em",
        "::placeholder": {
          color: "#aab7c4"
        }
      },
      invalid: {
        color: "#c23d4b"
      }
    }
  };
};

class _CardForm extends Component {
  state = {
    errorMessage: ""
  };

  handleChange = ({ error }) => {
    if (error) {
      this.setState({ errorMessage: error.message });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then((res, e) => {
        if (
          this.props.userInput.password1 === this.props.userInput.password2 &&
          this.props.userInput.email &&
          this.props.userInput.givenName &&
          this.props.userInput.familyName
        ) {
          const credentials = {
            email: this.props.userInput.email,
            password: this.props.userInput.password1,
            givenName: this.props.userInput.givenName,
            familyName: this.props.userInput.familyName
          };
          this.props.callReg(e, credentials, history, res);
        }
      });
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  render() {
    return (
      <div className="CardDemo">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Card details
            <CardElement onChange={this.handleChange} {...createOptions()} />
          </label>
          <div className="error" role="alert">
            {this.state.errorMessage}
          </div>
          <button>Pay</button>
        </form>
      </div>
    );
  }
}

const CardForm = injectStripe(_CardForm);

export default class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_ZU3mlTy0q00DATc9EyF9A8jX">
        <Elements>
          <CardForm
            callReg={this.props.callReg}
            userInput={this.props.userInput}
          />
        </Elements>
      </StripeProvider>
    );
  }
}
