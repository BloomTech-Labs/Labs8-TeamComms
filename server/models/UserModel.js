const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  premium: { type: Boolean, default: false },
  organization: String,
  created_at: { type: Date, default: Date.now }
});

const userModel = mongoose.model("User", userSchema); // users collection

module.exports = userModel;
