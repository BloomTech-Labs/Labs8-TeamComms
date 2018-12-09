const User = require("../../models/UserModel");

const userAll = async (req, res, next) => {
  await User.find({}, "email displayName organization").exec((err, users) => {
    if (err) {
      next({code: 404, message: err.message})
    } else {
      res.status(200).send(users);
    }
  });
};

module.exports = userAll;
