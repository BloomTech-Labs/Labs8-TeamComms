const User = require("../../models/UserModel"); //Model
const tokenCheck = require("../../validation/tokenCheck");
const hashedPassword = require("../../validation/hashedPassword");

const userEdit = async (req, res) => {
  let token = req.headers.auth;
  let newInfo = req.body; //TODO - Talk with front end about what info is being passed in
  if (!newInfo.password.length) {
    delete newInfo.password;
  } else {
    newInfo.password = hashedPassword(newInfo.password);
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
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          organization: user.organization,
          premium: user.premium,
        }
      });
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userEdit;
