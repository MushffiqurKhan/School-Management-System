const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name cannot be more than 30 characters"],
    validate: {
      validator: function (v) {
        return v.trim().length > 0;
      },
      message: "Name cannot be empty"
    }
  },
  emailormobile: {
    type: String,
    required: [true, "Email or Mobile is required"],
    unique: true,
    validate: {
      validator: function (v) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const mobileRegex = /^\d{10}$/;
        return emailRegex.test(v) || mobileRegex.test(v);
      },
      message: "Must be a valid email or a 10-digit mobile number"
    }
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"]
  },

  role: {
    type: String,
    enum: ['Student', 'Teacher', 'Principal'],
    default: 'Student'
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema, "User");
