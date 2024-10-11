const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "o.daoued@gmail.com", // Use env variable or fallback for testing
    pass: process.env.EMAIL_PASS || "dlzg vvfc qhkf uaew", // Use env variable for security
  },
});

export async function sendEmail(to, subject, text) {
  try {
    console.log("Sending email to:", to);
    await transporter.sendMail({
      from: process.env.EMAIL_USER || "o.daoued@gmail.com", // Same as above
      to,
      subject,
      text,
    });
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error; // Rethrow the error so the calling function can handle it
  }
}
