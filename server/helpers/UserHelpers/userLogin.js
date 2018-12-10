const User = require("../../models/UserModel"); //Model
const generateToken = require("../../validation/generateToken");
const hashedPassword = require("../../validation/hashedPassword");
const ServerError = require("../../validation/ErrorHandling/ServerError");

const userLogin = async (req, res, next) => {
  const creds = req.body;

  try {
    //Input - Password from request body
    //Output - Returns hashed password to be checked with username in database
    creds.password = hashedPassword(creds.password);

    const user = await User.findOne({
      email: creds.email,
      password: creds.password
    });

    if (!user) {
      throw new ServerError(401, "Invalid Credentials");
    } else {
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
    }
  } catch (err) {
    next({ code: err.code, message: err.message });
  }
};

module.exports = userLogin;
