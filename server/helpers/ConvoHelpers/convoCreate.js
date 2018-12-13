const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model
const LiveMeeting = require("../../models/LiveMeetingModel");
const moment = require("moment");
const callZoomAPI = require("../Zoom/zoomCreate");
const sendEmail = require("../../services/sendGrid");
const ServerError = require("../../validation/ErrorHandling/ServerError");

const convoCreate = async (req, res, next) => {
  //req checking
  try {
    if (
      !req.body.title ||
      !req.body.description ||
      !req.body.startTime ||
      !req.body.endTime ||
      !req.user._id
    ) {
      throw new ServerError(
        400,
        "Please provide title, description, startTime, endTime"
      );
    }

    //
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

    // zoom
    let createdZoomMeeting = {
      meetingId: "",
      url: ""
    };

    // zoom api call if requested from user
    if (newConvo.createZoom === true) {
      // to create a new zoom meeting
      const zoomApiData = await callZoomAPI(newConvo);
      // error
      if (zoomApiData.status !== 201) {
        throw new ServerError(502, "Zoom api error");
      }
      // filtered return data for db
      // zoom meetingId not currently saved in model
      createdZoomMeeting = {
        meetingId: zoomApiData.data.join_url,
        url: zoomApiData.data.join_url
      };
    }

    const convo = new Convo({
      creatorId: user._id,
      title: newConvo.title,
      description: newConvo.description,
      start_time: start,
      end_time: end,
      repeat: newConvo.repeat,
      questions: mappedQuestions,
      invitees: newConvo.invitees,
      zoom: createdZoomMeeting.url
    });

    if (!convo) {
      throw new ServerError(501, "Convo creation failed");
    } else {
      let convoExtract = convo.questions.map(q => {
        return {
          question: q.question,
          displayName: q.inquirer.displayName,
          answered: q.answered,
          created_at: q.created_at
        };
      });

      //
      const liveMeeting = new LiveMeeting({
        questions: convoExtract,
        meeting: convo._id
      });

      convo.liveMeeting = liveMeeting._id;
      user.meetings.push(convo._id);
      user.created_meetings.push(convo._id);

      await convo.save();

      let inviteeEmails = [];
      await Convo.findById(convo._id)
        .populate({
          path: "invitees",
          select: "meetings email"
        })
        .exec((err, query) => {
          if (err) {
            next({ code: 404, message: err.message });
          } else {
            query.invitees.forEach(async invitee => {
              invitee.meetings.push(convo._id);
              inviteeEmails.push(invitee.email);
              await invitee.save();
            });
          }
        });

      await liveMeeting.save();
      await user.save();

      let emailErr = await sendEmail(
        user.email,
        inviteeEmails,
        convo.title,
        start,
        newConvo.questions,
        convo.zoom
      );
      if (emailErr) {
        console.error("Error with send email confirmation:", emailErr);
      }
      res.status(201).send(convo);
    }
  } catch (err) {
    next({ code: err.code, message: err.message });
  }
};
module.exports = convoCreate;
