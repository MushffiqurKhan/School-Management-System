const mongoose = require('mongoose');

const PrincipalSchema = new mongoose.Schema({
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

  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: function (v) {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(v);
      },
      message: "Invalid email format"
    }
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"]
  },

  phone: {
    type: String, 
    required: [true, "Phone is required"],
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: "Phone number must be exactly 10 digits"
    }
  }

}, { timestamps: true });

module.exports = mongoose.model('Principal', PrincipalSchema, "Principal");
