const User = require("../../models/UserModel"); //Model
const hashedPassword = require("../../validation/hashedPassword");

const userEdit = async (req, res) => {
  let newInfo = req.body;
  console.log(newInfo);
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

  if (newInfo.oldPw && newInfo.newPw.length > 0) {
    newInfo.oldPw = hashedPassword(newInfo.oldPw);
    const user = await User.findOne({
      email: newInfo.email,
      password: newInfo.oldPw
    });

    if (!user) {
      return res.send("Invalid old password!");
    } else if (!newInfo.newPw) {
      return res.send("Please enter new PW!");
    } else {
      newInfo.password = hashedPassword(newInfo.newPw);
    }
  }

  try {
    console.log(newInfo);
    await User.findByIdAndUpdate(
      reqUser._id,
      { $set: newInfo },
      { select: "-password -googleId -stripeId, -zoomId", new: true }
    ).exec((err, result) => {
      if (err) {
      } else {
        console.log(result);
        res.status(200).send({ user: result });
      }
    });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userEdit;
