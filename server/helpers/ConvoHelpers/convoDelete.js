const Convo = require("../../models/ConvoModel"); //Model

const convoDelete = async (req, res) => {
  let id = req.params.id;
  console.log("req", req);
  await Convo.findByIdAndRemove(id, (err, meeting) => {
    if (err) return res.status(500).send(err);

    const response = {
      message: "meeting successfully deleted",
      id: meeting._id
    };
    return res.status(200).send(response);
  });
};

module.exports = convoDelete;
