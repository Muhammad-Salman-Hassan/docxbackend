const nodemailer = require("nodemailer");
const ejs=require("ejs")
var mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sh997826@gmail.com", // Your email id
    pass: "fhtuughdropwltdp", // Your password
  },
});
function sendEmail(email, token, link,name) {
  var email = email;
  var token = token;

  ejs.renderFile(
    "templates/mailTemplate.ejs",
    { link ,name},
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: "fuuast@gmail.pk",
          to: email,
          subject: "Reset Password Link ",
          html: data,
        };

        mail.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log(0);
          }
        });
      }
    }
  );
}

module.exports = sendEmail;
