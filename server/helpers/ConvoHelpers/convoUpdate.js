const Convo = require("../../models/ConvoModel"); //Model
const LiveMeeting = require("../../models/LiveMeetingModel");
const moment = require("moment");

const convoUpdate = async (req, res) => {
  const user = req.user;
  const newConvo = req.body;
  const id = req.params.id;
  console.log("user", req.user);

  try {
    let questionExtract;
    if (newConvo.questions) {
      questionExtract = newConvo.questions.map(q => {
        return {
          question: q.question,
          displayName: q.inquirer.displayName,
          answered: q.answered,
          created_at: q.created_at
        };
      });
    }

    await LiveMeeting.findOneAndUpdate(
      { meeting: id },
      { questions: questionExtract },
      (err, result) => {
        if (err) {
          throw new Error("Problem with live meeting");
        } else {
          return result;
        }
      }
    );

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

    console.log(newConvo);
    await Convo.findByIdAndUpdate(
      id,
      {
        creatorId: user._id,
        title: newConvo.title,
        description: newConvo.description,
        start_time: moment(newConvo.startTime).toDate(),
        end_time: moment(newConvo.endTime).toDate(),
        repeat: newConvo.repeat,
        questions: mappedQuestions,
        invitees: newConvo.invitees
      },
      (err, result) => {
        if (err) {
          throw new Error(err);
        } else {
          return result;
        }
      }
    );
    if (newConvo.invitees.length > 0) {
      await Convo.findById(id)
        .populate({
          path: "invitees",
          select: "meetings"
        })
        .exec((err, query) => {
          if (err) {
            throw new Error(err);
          } else {
            query.invitees.forEach(async invitee => {
              console.log(invitee);
              if (invitee.meetings.includes(id) === true) {
                invitee.meetings.push(id);
                await invitee.save();
              }
            });
          }
        });
    }
    return res.status(201).send(newConvo);
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports = convoUpdate;
