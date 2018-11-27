const User = require("../../models/UserModel");

const userAll = async (req, res) => {
  await User.find({}, "-_id email displayName organization").exec(
    (err, users) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(users);
      }
    }
  );
};

module.exports = userAll;
