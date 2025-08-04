const con = require('../Config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateOtp,verifyOtp } = require('./OTPlog');
const { send_otp } = require('./MobileService');
const OTPlog = require('./OTPlog');

const register = async ({ name, emailormobile, password, role }) => {
  try {
    const existingUser = await con.User.findOne({ emailormobile });
    if (existingUser) return { status: false, exists: emailormobile };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new con.User({
      name,
      emailormobile,
      password: hashedPassword,
      role
    });
    await newUser.save();
    return { status: true };
  } catch (error) {
    console.error("Error registering user:", error.message);
    return {
      status: false,
      error: error.message.includes("validation")
        ? error.message
        : "Something went wrong",
    };
  }
};


const login = async ({ emailormobile, password }) => {
  try {
    const user = await con.User.findOne({ emailormobile });
    if (!user) return { status: false, error: "Invalid credentials" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { status: false, error: "Invalid credentials" };

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    return {
      status: true,
      data: { token, role: user.role, name: user.name }
    };
  } catch (error) {
    console.error("Error logging in:", error.message);
    return {
      status: false,
      error: error.message.includes("validation")
        ? error.message
        : "Something went wrong"
    };
  }
};

const forgotPassword = async ({ emailormobile, newpassword }) => {
  const hashPassword = async (password) =>{
  const hashedPassword = await bcrypt.hash(password,(10));
  return hashedPassword;
}
  try {
    const user = await con.User.findOne({ emailormobile });

    if (!user) return { status: false, error: "User not found" };
    user.password = await hashPassword(newpassword);
    await user.save();
    return {
      status: true
    };
  } catch (error) {
    console.error("Error resetting password:", error.message);
    return {
      status: false,
      error: "Something went wrong"
    };
  }
};

const verifyMobileSendOtp = async (data) => {
  try {
    const { emailormobile } = data;

    const user = await con.User.findOne({ emailormobile });
    if (!user) {
      return {
        statusCode: 404,
        result: false,
        message: "Mobile not found",
      };
    }

    const otpResult = await generateOtp({
      emailormobile: emailormobile,
    });

    if (!otpResult.status) {
      return {
        status: false,
        message: "Failed to generate OTP",
        statusCode: 500,
      };
    }

    const message = `${otpResult.otp} is your OTP for verification - Spidey`;
    const sendOtpRes = await send_otp({
      message,
      emailormobile: emailormobile.startsWith("+91") ? emailormobile : `+91${emailormobile}`,
    });

    if (!sendOtpRes.status) {
      return {
        status: false,
        message: sendOtpRes.error || "Failed to send OTP",
        statusCode: 500,
      };
    }

    return {
      status: true,
      message: "OTP sent",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error verify mobile and send otp:", error.message);
    throw error;
  }
};

const verifyMobileOtp = async (userdata) => {
  try {
    const { emailormobile, otp } = userdata;

    if (!emailormobile || !otp) {
      return {
        status: false,
        message: "Mobile number and OTP are required",
        code: 400,
      };
    }
  
    const isVerified = await verifyOtp({
      otp,
      emailormobile: emailormobile,
    });

    if (!isVerified) {
      return {
        status: false,
        message: "Invalid or OTP expired for this number",
        code: 400,
      };
    }
    return {
      status: true,
      message: "Mobile number verified successfully",
      code: 200,
      data: { emailormobile },
    };
    
  } catch (error) {
    console.error("Error verify mobile otp:", error.message);
    throw error;
  }
};

const sendEmailOtp = async ({ email }) => {
  try {
    if (!email) {
      return {
        status: false,
        message: "Email is required",
        code: 400,
      };
    }

    const otpPayload = {
      verification_type: "email",
      email_mobile: email ,
    };

    const isSent = await generateOtp(otpPayload); // ⚠️ This should send OTP on email


    if (!isSent) {
      return {
        status: false,
        message: "Failed to send OTP to email",
        code: 500,
      };
    }

    return {
      status: true,
      message: "OTP sent successfully to your email",
      code: 200,
    };
  } catch (error) {
    console.error("Error sending email OTP:", error.message);
    throw error;
  }
};
const verifyEmailOTP = async (data, type) => {
  try {
    const { email_mobile, otp } = data;

    // Find user
    const user = await con.User.findOne({ email_mobile});
    if (!user) {
      return {
        status: false,
        message: "Email is not registered",
        statusCode: 404,
      };
    }

    // Verify OTP
    const otpValid = await verifyOtp({
      verification_type: type || "email",
      otp,
      email_mobile: email_mobile,
    });

    if (!otpValid) {
      return {
        status: false,
        message: "Invalid or expired OTP",
        statusCode: 400,
      };
    }

    // Success
    return {
      status: true,
      message: "OTP verified successfully",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in verifyMobileOtp:", error.message);
    throw error;
  }
};
module.exports ={
    register,
    login,
    forgotPassword,
    verifyMobileSendOtp,
    verifyMobileOtp,
    sendEmailOtp,
    verifyEmailOTP
}