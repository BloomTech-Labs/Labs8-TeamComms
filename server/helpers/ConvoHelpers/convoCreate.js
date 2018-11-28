const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model
const moment = require('moment');

const convoCreate = async(req, res) => {
  const user = req.user;
  console.log('user, from convoCreate:', user);
  const newConvo = req.body;
  const start = moment(newConvo.startTime).toDate();
  const end = moment(newConvo.endTime).toDate();
  const mappedQuestions = newConvo.questions.map(currentQuestion => {
    return {
        user: user._id,
        question: currentQuestion
      }  
  });
  try {
    const convo = new Convo(
      {
        creatorId: user._id,
        title: newConvo.title,
        description: newConvo.description,
        start_time: start,
        end_time: end,
        repeat: newConvo.repeat,
        questions: mappedQuestions
      // attendees: 
      }
    );
    if (!convo) {
      throw new Error('Convo creation failed!')
    } 
    else {
      await convo.save();
      user.meetings.push(convo._id);
      user.created_meetings.push(convo._id);
      await user.save();
      res.status(201).send(convo);
    }
  }
  catch(err) {
    res.status(400).send(err)
  }
}
module.exports = convoCreate;