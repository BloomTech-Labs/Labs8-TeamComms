const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model

const convoRetrieve = async (req, res, next) => {
  const user = req.user;

  await User.findById(user._id)
    .populate("meetings")
    .exec((err, posts) => {
      if (err) {
        next({code: 500, message: err.message})
      } else {
        res.status(200).send(posts.meetings);
      }
    });
};

module.exports = convoRetrieve;
