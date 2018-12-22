const express = require("express");
const Router = express.Router();
const passport = require("passport");
const generateToken = require("../validation/generateToken");

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

Router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://teamcomm.app/register"
  }),
  (req, res) => {
    res.redirect(`https://teamcomm.app/dashboard/${generateToken(req.user)}`);
  });


module.exports = Router;
