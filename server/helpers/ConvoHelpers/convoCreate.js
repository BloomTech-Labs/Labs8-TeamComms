const User = require("../../models/UserModel"); //Model
const Convo = require("../../models/ConvoModel"); //Model
const LiveMeeting = require("../../models/LiveMeetingModel");
const moment = require("moment");
const callZoomAPI = require("../Zoom/zoomCreate");
const sendEmail = require("../SendGrid/sendGrid");
const async = require("async");

const convoCreate = async (req, res) => {
  // default error code set to 'internal server error'
  let errorStatusCode = 500;
  //req checking
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.startTime ||
    !req.body.endTime ||
    !req.user._id
  ) {
    errorStatusCode = 400; // bad request
    res.status(errorStatusCode).end();
    return;
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

  try {
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
        errorStatusCode = 502; // bad gateway // zoom api error
        throw new Error("zoom api err");
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
      errorStatusCode = 501; // not implemented
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

      //
      const liveMeeting = new LiveMeeting({
        questions: convoExtract,
        meeting: convo._id
      });

      convo.liveMeeting = liveMeeting._id;
      user.meetings.push(convo._id);
      user.created_meetings.push(convo._id);

      await convo.save();

      await Convo.findById(convo._id)
        .populate({
          path: "invitees",
          select: "meetings"
        })
        .exec((err, query) => {
          if (err) {
            errorStatusCode = 404; // not found
            throw new Error(err);
          } else {
            query.invitees.forEach(async invitee => {
              invitee.meetings.push(convo._id);
              await invitee.save();
            });
          }
        });

      await liveMeeting.save();
      await user.save();

      const sg = require("sendgrid")(process.env.SENDGRID_KEY);

      async.parallel(
        [
          function(callback) {
            sendEmail(
              callback,
              "jj@jjashcraft.com",
              convo.invitees,
              "Test Subject",
              "Text Content",
              `<p style="font-size: 32px;">You've been invited to a new meeting!</p> Zoom: ' ${
                convo.zoom
              }`
            );
          }
        ],
        function(err, results) {
          res.send({
            status: 201,
            success: true,
            message: "Emails sent",
            successfulEmails: results[0].successfulEmails,
            errorEmails: results[0].errorEmails,
            convo
          });
        }
      );

      // res.status(201).send(convo);
    }
  } catch (err) {
    res.status(errorStatusCode).send(err);
  }
};
module.exports = convoCreate;
