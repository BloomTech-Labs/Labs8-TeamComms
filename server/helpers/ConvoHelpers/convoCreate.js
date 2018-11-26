const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model

const convoCreate = async(req, res) => {
  const user = req.user;
  console.log('user, from convoCreate:', user);
  const newConvo = req.body;

  const convo = new Convo(
    {
    creatorId: user._id,
    title: newConvo.title,
    description: newConvo.description,
    // start_time: newConvo.startTime,
    // end_time: newConvo.endTime,
    // attendees: 
    }
  );
  await convo.save();
  user.meetings.push(convo._id);
  user.created_meetings.push(convo._id);
  await user.save();
  res.status(201).send({
    user: {
      meeting: user.meetings
    }
  });
}
module.exports = convoCreate;