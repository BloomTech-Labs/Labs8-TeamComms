const User = require("../../models/UserModel"); //Model

const userAdd = (req, res) => {
  const user = new User(req.body); //document instance
  
  user
    .save()
    .then(savedUser => res.status(201).send(savedUser))
    .catch(err => res.status(501).send(err.message));
};

module.exports = userAdd;
