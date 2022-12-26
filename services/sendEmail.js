const nodemailer=require("nodemailer")
function sendEmail(email, token,link) {
    var email = email;
    var token = token;
 
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sh997826@gmail.com', // Your email id
            pass: '@salmanhasan288311' // Your password
        }
    });
 
    var mailOptions = {
        from: 'nicesnippets@gmail.com',
        to: email,
        subject: 'Reset Password Link - nicesnippets.com',
        html: `You requested for reset password, kindly use this ${link} to reset your password`
    };
 
    mail.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(0)
        }
    });
}

module.exports=sendEmail