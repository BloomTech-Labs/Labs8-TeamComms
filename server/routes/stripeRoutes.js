// const stripe = require('../constants/stripe');
const User = require("../models/UserModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeRoutes = app => {
  app.get("/", (req, res) => {
    console.log(req);
    res.send({
      message: "Hello Stripe checkout server!",
      timestamp: new Date().toISOString()
    });
  });

  // app.post("/payment", (req, res) => {
  //   console.log(req);
  //   const user = User.findOne({});
  //   console.log(user);
  //   const customer = stripe.customers.create({
  //     email: user.email,
  //     token: "",
  //     plan: process.env.STRIPE_PLAN_ID
  //   });
  //   user.stripeId = customer.id;
  //   user.premium = true;
  // });

  return app;
};

module.exports = stripeRoutes;
