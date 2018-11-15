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
    failureRedirect: "https://team-comm.netlify.com/register"
  }),
  (req, res) => {
    res.redirect(`https://team-comm.netlify.com/dashboard/${generateToken(req.user)}`);
  });

  
// Router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send(req.user);
//   }
// );

module.exports = Router;
