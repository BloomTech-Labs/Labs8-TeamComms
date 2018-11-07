const User = require("../../models/UserModel"); //Model

const userGetAll = (req, res) => {
  User.find()
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err.message));
};

module.exports = userGetAll;

//   try {
//     const users = await User.find({});
//     res.status(200).json(users);
//   } catch (err) {
//     next({ status: 500, message: err.message });
//   }
