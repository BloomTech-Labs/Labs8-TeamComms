const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model

const convoFindById = async (req, res) => {
  const id = req.params.id;

  await Convo.findById(id)
    .populate(
      {
        path: "invitees creatorId",
        select: "email organization displayName"
      }
    )
    .exec((err, query) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(query);
      }
    });
};

module.exports = convoFindById;
