const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model
const ServerError = require("../../validation/ErrorHandling/ServerError");
const convoFindById = async (req, res, next) => {
  const id = req.params.id;
  try {
    Convo.findById(id)
      .populate({
        path: "invitees creatorId",
        select: "email organization displayName"
      })
      .exec((err, query) => {
        if (err) {
          next({ code: 500, message: err.message });
        } else {
          res.status(200).send(query);
        }
      });
  } catch (err) {
    next({ code: 500, message: err.message });
  }
};

module.exports = convoFindById;
