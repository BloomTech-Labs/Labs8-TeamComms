const express = require("express");
const Router = express.Router();
const passport = require("passport");
const generateToken = require('../validation/generateToken')


Router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

//callbackroute for google to redirect to
Router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false
  }),
  (req, res) => {
    console.log(req.user);
    res.send(`Bearer ${generateToken(req.user)}`)
  }
);

// Router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

module.exports = Router;