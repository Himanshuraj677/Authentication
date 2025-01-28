import transporter from "../config/mail.config.js";

const sendMail = (email, verifyToken) => {
    const mailOptions = {
        from: 'himanshurajbr01cq@gmail.com',    // Sender address
        to: email,   // Recipient address
        subject: 'Test Email',           // Subject of the email
        text: `Hello, this is a test email sent using Nodemailer!\n${verifyToken}`,   // Plain text body
        // or use html for an HTML email
        html: `<h1>Hello</h1><h2>${verifyToken}</h2><p>This is a test email sent using Nodemailer!</p>` // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred: ' + error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default sendMail;

