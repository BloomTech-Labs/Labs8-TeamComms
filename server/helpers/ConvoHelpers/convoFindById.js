const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model

const convoFindById = async (req, res) => {
  const id = req.params.id;

  const convo = await Convo.findById(id)
    .populate("invitees")
    .exec((err, query) => {
      if (err) {
        res.send(err)
      } else {
        res.status(200).send(query);
      }
    });
};

module.exports = convoFindById;
