const mongoose = require('mongoose');

const Student = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [20, "Name cannot be more than 20 characters"],
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
      message: "Must be a valid email or 10-digit mobile number"
    }
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"]
  },

  class: {
    type: String,
    required: [true, "Class is required"],
    minlength: [1, "Class must not be empty"]
  },

  rollNumber: {
    type: String,
    required: [true, "Roll Number is required"],
    unique: true,
    minlength: [1, "Roll Number must not be empty"]
  },

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },

  age: {
    type: Number,
    min: [3, "Age must be at least 3"],
    max: [25, "Age must be 25 or less"]
  },

  role: {
    type: String,
    default: 'Student'
  }

}, { timestamps: true });

module.exports = mongoose.model('Student', Student, "Student");
