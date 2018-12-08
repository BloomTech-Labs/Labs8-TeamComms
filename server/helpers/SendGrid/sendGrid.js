const sg = require("@sendgrid/mail");
const dotenv = require("dotenv").config();

sg.setApiKey(process.env.SENDGRID_KEY);

function sendEmail(email, meetingTitle, startTime, questions, zoomLink) {
  let questionsHtml = questions.map(question => `
   
      <li > ${question}</li>`);
  console.log(email);
  console.log(zoomLink);
  try {
    const message = {
      to: email,
      from: "team-communicator@teamcommunicator.com",
      text: "an email from team comm",
      html: `<p style="font-size: 32px;">You've created a new meeting with Team Communicator! ${meetingTitle}
      starts at ${
        startTime
      }. Zoom Link: ' ${zoomLink}</p><br/> <h2>Questions to review prior to meeting: </h2><br/><ul>${questionsHtml}</ul>`,
      subject: "New Meeting Created with Team Communicator!"
    };

    sg.send(message);
  } catch (err) {
    console.error(err);
  }
}

module.exports = sendEmail;