import React from "react";
import { injectStripe, CardElement } from "react-stripe-elements";
import { callReg } from "../../actions/index";
import { connect } from "react-redux";
import history from "../../history";

class _CardForm extends React.Component {
  StripeRegister = (e, payload) => {
    e.preventDefault();
    this.props.callReg(e, this.props.userInput, history, payload);
  };
  render() {
    return (
      <form>
        <CardElement />
        <button
          onSubmit={e => {
            e.preventDefault();
            this.props.stripe
              .createToken()
              .then(payload => e => {
                console.log("payload", payload);
                this.StripeRegister(payload);
              })
              .catch(err => {
                console.log(err);
              });
          }}
        >
          Pay
        </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
let mergeProps;

const CardForm = connect(
  mapStateToProps,
  {
    callReg
  },
  mergeProps,
  { pure: false }
)(injectStripe(_CardForm));

export default CardForm;
