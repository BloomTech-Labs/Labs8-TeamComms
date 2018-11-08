const User = require("../../models/UserModel"); //Model
const generateToken = require("../../validation/generateToken");
const hashedPassword = require("../../validation/hashedPassword");

const userRegister = async (req, res) => {
  try {
    //Creates new document instance
    const user = new User(req.body);

    //Input - Password from request body
    //Output - Returns hashed password to be checked with username in database
    user.password = hashedPassword(user.password);

    //Saves user document to user collection
    await user.save();

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
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = userRegister;
