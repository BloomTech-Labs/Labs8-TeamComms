var helper = require("sendgrid").mail;
const async = require("async");
const dotenv = require("dotenv").config();

function sendEmail(
  parentCallback,
  fromEmail,
  toEmails,
  subject,
  textContent,
  htmlContent
) {
  const errorEmails = [];
  const successfulEmails = [];
  const sg = require("sendgrid")(process.env.SENDGRID_KEY);

  async.parallel(
    [
      function(callback) {
        // Add to emails
        for (let i = 0; i < toEmails.length; i += 1) {
          // Add from emails
          const senderEmail = new helper.Email(fromEmail);
          // Add to email
          const toEmail = new helper.Email(toEmails[i]);
          // HTML Content
          const content = new helper.Content("text/html", htmlContent);
          const mail = new helper.Mail(senderEmail, subject, toEmail, content);
          var request = sg.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: mail.toJSON()
          });
          sg.API(request, function(error, response) {
            console.log("SendGrid");
            if (error) {
              console.log("Error response received");
            }
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          });
        }
        // return
        callback(null, true);
      }
    ],
    function(err, results) {
      console.log("Done");
    }
  );
  parentCallback(null, {
    successfulEmails: successfulEmails,
    errorEmails: errorEmails
  });
}

module.exports = sendEmail;
