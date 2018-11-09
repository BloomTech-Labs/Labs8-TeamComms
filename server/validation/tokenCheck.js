const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const tokenCheck = token => {
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
