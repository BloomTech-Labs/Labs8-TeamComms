const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model

const convoRetrieve = async (req, res) => {
  const user = req.user;

  await User.findById(user._id)
    .populate("meetings")
    .exec((err, posts) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(posts.meetings);
      }
    });
};

module.exports = convoRetrieve;
