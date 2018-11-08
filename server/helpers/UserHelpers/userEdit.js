const User = require("../../models/UserModel"); //Model
const generateToken = require("../../validation/generateToken");
const tokenCheck = require("../../validation/tokenCheck");

const userEdit = async (req, res) => {
  let token = req.headers.auth;
  const newInfo = req.body;
  try {
    token = tokenCheck(token);
    if (!token) {
      throw new Error("Invalid token!");
    } else {
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
      res.status(200).send({
        user: {
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          organization: user.organization,
          premium: user.premium
        }
      });
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userEdit;
