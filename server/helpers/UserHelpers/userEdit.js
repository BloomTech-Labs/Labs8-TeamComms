const User = require("../../models/UserModel"); //Model
const tokenCheck = require("../../validation/tokenCheck");
const hashedPassword = require("../../validation/hashedPassword");

const userEdit = async (req, res) => {
  let newInfo = req.body;
  const reqUser = req.user;
  if (Object.keys(req.body).length < 4) {
    return res.send(
      "Please send {displayName, givenName, familyName, email, oldPw, newPw} even if empty string"
    );
  }

  if (!newInfo.phone_number.length) {
    delete newInfo.phone_number;
  }

  if (!newInfo.email.length) {
    delete newInfo.email;
  }

  if (!newInfo.oldPw.length) {
    delete newInfo.password;
  } else {
    newInfo.oldPw = hashedPassword(newInfo.oldPw);
    const user = await User.findOne({
      email: newInfo.email,
      password: newInfo.oldPw
    });

    if (!user) {
      return res.send("Invalid old password!");
    } else if (!newInfo.newPw.length) {
      return res.send("Please enter new PW!");
    } else {
      newInfo.password = hashedPassword(newInfo.newPw);
    }
  }

  try {
    const user = await User.findByIdAndUpdate(reqUser._id, { newInfo })
      .populate("-password -googleId -stripeId, -zoomId")
      .exec((err, result) => {
        if (err) {
        } else {
          return result;
        }
      });

    res.status(200).send(user);
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userEdit;
