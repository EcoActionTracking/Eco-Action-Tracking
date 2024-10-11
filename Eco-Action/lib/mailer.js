const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "o.daoued@gmail.com",
    pass: "dlzg vvfc qhkf uaew",
  },
});

async function sendEmail(to, subject, text) {
  try {
    console.log("Email: ", process.env.EMAIL_USER);
    await transporter.sendMail({
      from: "o.daoued@gmail.com",
      to,
      subject,
      text,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Rethrow the error so the calling function can handle it
  }
}

module.exports = sendEmail;
