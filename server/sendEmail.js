require("dotenv").config();
const sgMail=require('@sendgrid/mail');
sgMail.setApiKey('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');
const message={
    to:'gj7097@srmist.edu.in',
    from:'greeta1999kavitha@gmail.com',
    subject:'OTP from Clicker',
    html:'<h1>Hello</h1>'
}
sgMail.send(message)
.then((respose)=>console.log("Email sent..."))
.catch((error)=>console.log(error.message));
module.exports=sendEmail;