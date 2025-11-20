const nodemailer = require('nodemailer');
const env = require('../config/env');

const transporter = nodemailer.createTransport({
  host: env.email.host,
  port: env.email.port,
  secure: env.email.secure,
  auth: {
    user: env.email.user,
    pass: env.email.pass,
  },
});

const queueEmail = async ({ to, subject, html }) => {
  if (!to) {
    return;
  }

  await transporter.sendMail({
    from: `Ethio Tech Hub <${env.email.user}>`,
    to,
    subject,
    html,
  });
};

module.exports = {
  queueEmail,
};

