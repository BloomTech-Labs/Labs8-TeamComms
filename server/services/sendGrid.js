const sg = require("@sendgrid/mail");
const dotenv = require("dotenv").config();
const ServerError = require("../validation/ErrorHandling/ServerError")
sg.setApiKey(process.env.SENDGRID_KEY);

async function sendEmail(
  email,
  inviteeEmails,
  meetingTitle,
  startTime,
  questions,
  zoomLink
) {
  let questionsHtml = questions.map(
    question => `
   
      <li > ${question}</li>`
  );

  try {
    if (!inviteeEmails.length) {
      const message = {
        to: email,
        from: "team-communicator@teamcommunicator.com",
        text: "an email from team comm",
        html: `<p style="font-size: 32px;">You've created a new meeting with Team Communicator! ${meetingTitle}
      starts at ${startTime}. Zoom Link: ' ${zoomLink}</p><br/> <h2>Questions to review prior to meeting: </h2><br/><ul>${questionsHtml}</ul>`,
        subject: "New Meeting Created with Team Communicator!"
      };

      let errCheck = await sg
        .send(message)
        .then(res => {
          console.log("Email Sent");
        })
        .catch(err => {
          return err;
        });
      if (errCheck) {
        throw new ServerError(errCheck.code, errCheck.message);
      }
    } else {
      const emails = [
        {
          to: email,
          from: "team-communicator@teamcommunicator.com",
          subject: "New Meeting Created with Team Communicator!",
          text: "an email from team comm",
          html: `<p style="font-size: 32px;">You've created a new meeting with Team Communicator! ${meetingTitle}
          starts at ${startTime}. Zoom Link: ' ${zoomLink}</p><br/> <h2>Questions to review prior to meeting: </h2><br/><ul>${questionsHtml}</ul>`
        },
        {
          to: inviteeEmails,
          from: "team-communicator@teamcommunicator.com",
          subject: "Invited to New Meeting at Team Communicator!",
          text: "an email from team comm",
          html: `<p style="font-size: 32px;">You were invited to a new meeting with Teamm communicator! ${meetingTitle}
          starts at ${startTime}. Zoom Link: ' ${zoomLink}</p><br/> <h2>Questions to review prior to meeting: </h2><br/><ul>${questionsHtml}</ul>`
        }
      ];
      let errCheck = await sg
        .send(emails)
        .then(res => {
          console.log("Emails Sent");
        })
        .catch(err => {
          return err;
        });
      if (errCheck) {
        throw new ServerError(errCheck.code, errCheck.message);
      }
    }
  } catch (err) {
    return err;
  }
}

module.exports = sendEmail;
