const User = require("../../models/UserModel"); //Model
const hashedPassword = require("../../validation/hashedPassword");
const ServerError = require("../../validation/ErrorHandling/ServerError");

const userEdit = async (req, res, next) => {
  let newInfo = req.body;
  console.log(newInfo);
  const reqUser = req.user;
  try {
    if (Object.keys(req.body).length < 4) {
      throw new ServerError(
        400,
        "Please send {displayName, givenName, familyName, email, oldPw, newPw} even if empty string"
      );
    }

    if (!newInfo.phone_number.length) {
      delete newInfo.phone_number;
    }

    if (!newInfo.email.length) {
      delete newInfo.email;
    }

    if (newInfo.oldPw && newInfo.newPw.length > 0) {
      newInfo.oldPw = hashedPassword(newInfo.oldPw);
      const user = await User.findOne({
        email: newInfo.email,
        password: newInfo.oldPw
      });

      if (!user) {
        throw new ServerError(401, "Invalid Old Password!");
      } else if (!newInfo.newPw) {
        throw new ServerError(400, "Please enter new PW!");
      } else {
        newInfo.password = hashedPassword(newInfo.newPw);
      }
    }

    await User.findByIdAndUpdate(
      reqUser._id,
      { $set: newInfo },
      { select: "-password -googleId -stripeId, -zoomId", new: true }
    ).exec((err, result) => {
      if (err) {
        throw new ServerError(502, err.message)
      } else {
        res.status(200).send({ user: result });
      }
    });
  } catch (err) {
    next({ code: err.code, message: err.message });
  }
};

module.exports = userEdit;
