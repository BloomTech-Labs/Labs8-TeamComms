const mongoose = require("mongoose");
const hashedPassword = require("../validation/hashedPassword");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  is_active: { type: Boolean, default: true },
  premium: { type: Boolean, default: false },
  organization: String,
  created_at: { type: Date, default: Date.now }
});

const userModel = mongoose.model("User", userSchema); // users collection

module.exports = userModel;
