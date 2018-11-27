const User = require("../../models/UserModel");

const userAll = async (req, res) => {
  await User.find({}, "email displayName organization").exec((err, users) => {
    if (err) {
      console.log(err);
    } else {
      const newUsers = users.map(user => {
        return {
          email: user.email,
          displayName: user.displayName,
          organization: user.organization
        };
      });
      res.status(200).send(newUsers);
    }
  });
};

module.exports = userAll;
