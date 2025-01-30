import transporter from "../config/mail.config.js";

const sendMail = (email, template) => {
    const mailOptions = {
        from: 'himanshurajbr01cq@gmail.com',    // Sender address
        to: email,   // Recipient address
        subject: 'Test Email',           // Subject of the email
        text: template.text,   // Plain text body
        // or use html for an HTML email
        html: template.html // HTML body
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

