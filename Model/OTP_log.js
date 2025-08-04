const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OTPLog = new Schema(
  {
    otp: {
       type: String,
       required:[ true, "Otp is required"]
      },
    used: {
      type: Boolean,
      default: false 
    },
    email_mobile: {
      type: String,
      required: [true,"email or mobilr is required"],
    },
    verification_type: {
      type: String,
      enum: ["email", "mobile"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OtpLog", OTPLog, "OtpLog");