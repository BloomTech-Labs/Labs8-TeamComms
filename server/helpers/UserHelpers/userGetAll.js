const User = require("../../models/UserModel"); //Model

const userGetAll = (req, res) => {
  User.find()
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err.message));
};

module.exports = userGetAll;
