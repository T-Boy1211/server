const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, userData) => {
  const templatePath = path.join(__dirname, `../views/emails/${template}.ejs`);
  const html = await ejs.renderFile(templatePath, userData);

  const mailOptions = {
    from: `'Smart Pro' <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎉 Welcome to Smart Pro",
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
