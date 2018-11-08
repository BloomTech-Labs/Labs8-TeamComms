const jwt = require("jsonwebtoken");
const secret = "12345";

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user._id
  };

  const options = {
    expiresIn: "24h",
    jwtid: "12345"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;
