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

//callbackroute for google to redirect to
Router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "https://team-comm.netlify.com/register"
  }),
  (req, res) => {
    console.log(req.user);
    const jwt = generateToken(req.user);
    console.log(jwt);
    const htmlWithEmbeddedJWT = `
    <html>
      <script>
        window.localStorage.setItem('JWT', '${jwt}');
        window.location.href = '/';
      </script>
    </html>
    `;

    res.send(htmlWithEmbeddedJWT);
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
