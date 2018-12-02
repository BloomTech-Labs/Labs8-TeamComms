const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model
const LiveMeeting = require("../../models/LiveMeetingModel");
const moment = require("moment");

const convoCreate = async (req, res) => {
  const user = req.user;
  const newConvo = req.body;
  const start = moment(newConvo.startTime).toDate();
  const end = moment(newConvo.endTime).toDate();
  let mappedQuestions;
  if (newConvo.questions) {
    mappedQuestions = newConvo.questions.map(currentQuestion => {
      return {
        inquirer: {
          email: user.email,
          displayName: user.displayName
        },
        question: currentQuestion
      };
    });
  }
  try {
    const convo = new Convo({
      creatorId: user._id,
      title: newConvo.title,
      description: newConvo.description,
      start_time: start,
      end_time: end,
      repeat: newConvo.repeat,
      questions: mappedQuestions,
      invitees: newConvo.invitees
    });

    if (!convo) {
      throw new Error("Convo creation failed!");
    } else {
      
      let convoExtract = convo.questions.map(q => {
        return {
          question: q.question,
          displayName: q.inquirer.displayName,
          answered: q.answered,
          created_at: q.created_at
        };
      });

      const liveMeeting = new LiveMeeting({
        questions: convoExtract,
        meeting: convo._id
      });

      convo.liveMeeting = liveMeeting._id;
      user.meetings.push(convo._id);
      user.created_meetings.push(convo._id);

      await convo.save();
      await liveMeeting.save();
      await user.save();

      res.status(201).send(convo);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = convoCreate;
