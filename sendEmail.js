require('dotenv').config();

const nodemailer = require('nodemailer');

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // Replace with your email provider's SMTP server
  port: process.env.SMTP_PORT,        // Replace with the SMTP port   
  auth: {
    user: process.env.SMTP_USER,      // Replace with your email
    pass: process.env.SMTP_PASSWORD          // Replace with your email password
  }
});

// Set up email options
const mailOptions = {
  from: '',                       // Sender address
  to: '',                         // List of recipients
  subject: 'Test Email from Nodemailer',                // Subject line
  text: 'This is a test email with plain text.',        // Plaintext message
  html: '<p>This is a test email with <strong>HTML</strong> content.</p>', // HTML message
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Error occurred:', error.message);
  } else {
    console.log('Email sent:', info.response);
  }
});