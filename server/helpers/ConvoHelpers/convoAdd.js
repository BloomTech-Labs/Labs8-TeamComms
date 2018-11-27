const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model

const convoAdd = async (req, res) => {
  let user = req.user;
  let convo = req.body;
  
  try {
    convo = await Convo.findById(convo.id);
    if (!convo) {
      throw new Error("Cannot find convo!");
    } else {
      user.meetings.push(convo._id);
      convo.attendees.push(user._id);

      await user.save();
      await convo.save();

      res.send(user.meetings);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = convoAdd;
