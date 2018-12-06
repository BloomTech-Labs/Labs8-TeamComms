const User = require("../../models/UserModel"); //Model
const generateToken = require("../../validation/generateToken");
const hashedPassword = require("../../validation/hashedPassword");

const userRegister = async (req, res) => {
  try {
    //Creates new document instance
    if (!req.body.password || !req.body.password.length) {
      return res.send("Please add a password");
    }
    const tempUser = req.body;
    tempUser.displayName = `${req.body.givenName} ${req.body.familyName}`;
    tempUser.name = {
      givenName: req.body.givenName,
      familyName: req.body.familyName
    };

    const user = new User(tempUser);
    //Input - Password from request body
    //Output - Returns hashed password to be checked with username in database
    user.password = hashedPassword(user.password);

    //Saves user document to user collection
    await user.save();

    res.status(200).send({
      token: `Bearer ${generateToken(user)}`,
      user: {
        id: user._id,
        displayName: user.displayName,
        name: user.name,
        email: user.email,
        phone_number: user.phone_number,
        organization: user.organization,
        premium: user.premium,
        is_active: user.is_active,
        notificationPref: user.notificationPref
      }
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = userRegister;
