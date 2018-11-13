const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const tokenCheck = token => {
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  const decoded = jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return null;
    } else {
      return decodedToken;
    }
  });
  return decoded;
};
module.exports = tokenCheck;
