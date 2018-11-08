const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  phone_number: {
    type: Number
  },
  email: {
    type: String
  },
  is_active: { type: Boolean, default: true },
  premium: { type: Boolean, default: false },
  organization: String,
  created_at: { type: Date, default: Date.now }
});

const userModel = mongoose.model("User", userSchema); // users collection

module.exports = userModel;
