const User = require("../../models/UserModel"); //Model
const generateToken = require("../../validation/generateToken");
const hashedPassword = require("../../validation/hashedPassword");
const ServerError = require("../../validation/ErrorHandling/ServerError");

const userRegister = async (req, res, next) => {
  try {
    //Creates new document instance
    if (!req.body.password || !req.body.password.length) {
      throw new ServerError(400, "Please add a password!");
    }
    const tempUser = req.body;
    if (!tempUser.givenName || !tempUser.familyName) {
      throw new ServerError(400, "User must give givenName and familyName");
    } else {
      tempUser.displayName = `${req.body.givenName} ${req.body.familyName}`;
      tempUser.name = {
        givenName: req.body.givenName,
        familyName: req.body.familyName
      };
    }

    const user = new User(tempUser);
    if (!user) {
      throw new ServerError(502, "User was not created, check inputs");
    }
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
    next({ code: err.code, message: err.message });
  }
};

module.exports = userRegister;
