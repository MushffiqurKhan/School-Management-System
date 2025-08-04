const con = require('../Config/db');
const sendEmail = require('../Config/emailService');

const otpLog = async ({ email_mobile, verification_type }) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (verification_type === "email" || verification_type === "mobile") {
      const existingOtp = await con.OTPLog.findOne({
        email_mobile,
        verification_type,
        used: false,
      });

      if (existingOtp) {
        existingOtp.otp = otp;
        await existingOtp.save();
      } else {
        const newOtpLog = new con.OTPLog({
          otp,
          email_mobile,
          verification_type,
        });
        await newOtpLog.save();
      }

      //  Send OTP via email if type is email
     if (verification_type === "email") {
        const subject = "Your Email OTP";
        const sent = await sendEmail({
          to: email_mobile,
          subject,
          otp,
        });

        if (!sent) {
          return {  
            status: false,
            message: "OTP generated but failed to send email.",
          };
        }
      }
    }

    return { status: true, otp };
  } catch (error) {
    console.error("Error in generate otp:", error.message);
    return { status: false, message: "Internal error while generating OTP" };
  }
};

const verifyOtp = async ({ verification_type, otp, email_mobile }) => {
  try {
    const otpLog = await con.OTPLog.findOne({
      email_mobile,
      otp: otp.trim(),
      used: false,
      verification_type,
    });

    if (!otpLog) {
      return false;
    }

    // Mark OTP as used (or delete)
    await con.OTPLog.deleteOne({ _id: otpLog._id });
    return true;
  } catch (error) {
    console.error("Error in verifyOtp:", error.message);
    return false;
  }
};

module.exports ={
    generateOtp: otpLog,
    verifyOtp
}