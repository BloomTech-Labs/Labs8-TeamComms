const User = require("../../models/UserModel"); //Model
const hash = require("pbkdf2");
const jwt = require("jsonwebtoken");

const secret = "12345";

const userEdit = async (req, res) => {
  let token = req.headers.auth;
  const newInfo = req.body;
  try {
    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          throw new Error("Token Invalid");
        } else {
          token = decodedToken;
        }
      });
      const user = await User.findByIdAndUpdate(
        { _id: token.id },
        { $set: newInfo },
        (err, result) => {
          if (err) {
            throw new Error("Problem with updating user");
          } else {
            return result;
          }
        }
      );
      res.send(user);
    } else {
      throw new Error("Token Invalid");
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userEdit;
