const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_SERVICE: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      EMAIL_SECURE: Boolean(process.env.EMAIL_SECURE),
      auth: {
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASS: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

// watch: https://www.youtube.com/watch?v=T6rElSLldyc&t=313s
// to continue
