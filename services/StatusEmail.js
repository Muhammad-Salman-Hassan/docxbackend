const nodemailer = require("nodemailer");
const ejs=require("ejs")
var mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sh997826@gmail.com", // Your email id
    pass: "fhtuughdropwltdp", // Your password
  },
});
function statusEmail(email,status,name) {
  var email = email;
  var status=status
  

    console.log(status,"status")
  ejs.renderFile(
    "templates/StatusEmail.ejs",
    { status,name},
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        var mailOptions = {
          from: "fuuast@gmail.pk",
          to: email,
          subject: "Document Status ",
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

module.exports = statusEmail;