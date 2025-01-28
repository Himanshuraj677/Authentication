import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const password = process.env.EMAIL_PASSWORD;
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or any other email service
  auth: {
    user: email,   // Your email address
    pass: password      // Your email password (or an app password)
  }
});

export default transporter;
