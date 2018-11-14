const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config()
const secret = process.env.SECRET_KEY;

function generateToken(user) {
  const payload = {
    id: user._id
  };

  const options = {
    expiresIn: "24h",
    jwtid: "12345"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
