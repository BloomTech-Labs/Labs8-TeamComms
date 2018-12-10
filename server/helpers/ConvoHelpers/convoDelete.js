const Convo = require("../../models/ConvoModel"); //Model
const ServerError = require("../../validation/ErrorHandling/ServerError");

const convoDelete = async (req, res, next) => {
  let id = req.params.id;

  try {
    let convo = await Convo.findByIdAndDelete(id);
    if (!convo) {
      throw new ServerError(404, "Meeting not found!");
    } else {
      if (!convo.invitees.length) {
        return res.status(200).send({
          message: "Meeting successfully deleted",
          id: convo._id
        });
      } else {
        convo.populate(
          { path: "invitees", select: "meetings" },
          (err, meeting) => {
            if (err) {
              next({ code: 500, message: err.message });
            } else {
              let newInvList;
              meeting.invitees.forEach(invitee => {
                newInvList = invitee.meetings.filter(userMeeting => {
                  return userMeeting.toString() !== meeting._id.toString();
                });
                invitee.meetings = newInvList;
                invitee.save();
              });
            }
          }
        );
        res.status(200).send({
          message:
            "Meeting successfully deleted along with invitees meetings updated",
          id: convo._id
        });
      }
    }
  } catch (err) {
    next({ code: err.code, message: err.message });
  }
};

module.exports = convoDelete;
