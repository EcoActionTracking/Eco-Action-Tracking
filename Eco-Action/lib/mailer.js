import nodemailer from "nodemailer";

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: "outlook", // e.g., smtp.gmail.com
  port: 587, // 465 for secure, 587 for TLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or app password
  },
});

// Function to send emails
export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
    });
    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
