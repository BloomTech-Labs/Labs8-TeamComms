const User = require("../../models/UserModel"); //Model

const userFind = (req, res) => {
  const { id } = req.params;

  User.findById(id)
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err.message));
};

module.exports = userFind;
