const User = require("../../models/UserModel"); //Model
const tokenCheck = require("../../validation/tokenCheck");
const hashedPassword = require("../../validation/hashedPassword");

const userEdit = async (req, res) => {
  let token = req.headers["jwt"] || req.headers['authorization'] || req.headers['auth'] || req.headers['x-access-token'];
  let newInfo = req.body; //TODO - Talk with front end about what info is being passed in
  if(Object.keys(req.body).length < 4){
    return res.send("Please send {displayName, givenName, familyName, email, oldPw, newPw} even if empty string");
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
    //Input - Token into decoder and checks if secret is valid
    //Output - Decoded token or null if invalid
    token = tokenCheck(token);

    if (!token) {
      throw new Error("Invalid token!");
    } else {
      //Input - Checks user collection for user using id from decoded token payload then updates
      //Output - New user object with updated info
      const user = await User.findOneAndUpdate(
        { _id: token.id },
        { $set: newInfo },
        (err, result) => {
          if (err) {
            throw new Error("Problem with editing user");
          } else {
            return result;
          }
        }
      );

      res.status(200).send({
        user: {
          displayName: user.displayName,
          name: user.name,
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
