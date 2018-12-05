const express = require("express");
const Router = express.Router();
const User = require("../models/UserModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

Router.route("/").get((req, res) => {
  res.send({
    message: "Hello Stripe checkout server!",
    timestamp: new Date().toISOString()
  });
});

Router.route("/payment").post(async (req, res) => {
  // Find the current user
  const user = await User.findOne({ email: req.body.token.email });
  if (!user) {
    return res.send("User Not Found");
  }
  // Create the customer in Stripe
  const customer = stripe.customers
    .create({
      email: user.email,
      source: req.body.token.id,
      plan: process.env.STRIPE_PLAN_ID
    })
    .catch(err => res.send(err));
  // Add the stripeID and premium status to user
  await User.findOneAndUpdate(
    { email: req.body.token.email },
    { premium: true }
  );
  res.send(customer);
});

module.exports = Router;
