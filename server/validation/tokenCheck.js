const jwt = require("jsonwebtoken");

const tokenCheck = token => {
  const secret = "12345";
  const decoded = jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      throw new Error("Token Invalid");
    } else {
      return decodedToken;
    }
  });
  return decoded;
};
module.exports = tokenCheck;
