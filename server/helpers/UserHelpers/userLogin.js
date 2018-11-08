const User = require("../../models/UserModel"); //Model
const generateToken = require("../../validation/generateToken");
const hashedPassword = require("../../validation/hashedPassword");

const userLogin = async (req, res) => {
  const creds = req.body;
  try {
    //Input - Password from request body
    //Output - Returns hashed password to be checked with username in database
    creds.password = hashedPassword(creds.password);

    const user = await User.findOne({
      username: creds.username,
      password: creds.password
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
      res.status(200).send({
        token: generateToken(user),
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

module.exports = userLogin;
