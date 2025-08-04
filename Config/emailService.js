const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, otp }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="max-width: 500px; margin: auto; padding: 20px; border-radius: 10px; font-family: Arial, sans-serif; background: #fff; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4285f4; text-align: center;">Email OTP</h2>
        <hr style="border: 0; border-top: 1px solid #ccc;" />
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) is:</p>
        <h1 style="text-align: center; color: #28a745; font-size: 48px;">${otp}</h1>
        <p>Please use this OTP to complete your login process. Do not share this code with anyone.</p>
        <p>Thank you for using Email OTP!</p>

      </div>
    `;

    const mailOptions = {
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(" OTP email sent to:", to);
    return true;
  } catch (error) {
    console.error(" Failed to send OTP email:", error.message);
    return false;
  }
};

module.exports = sendEmail;
