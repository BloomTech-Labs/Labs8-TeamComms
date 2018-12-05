const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
  googleId: String,
  stripeId: String,
  zoomId: String,
  displayName: {
    type: String,
    required: [true, "displayName is required!"]
  },
  name: {
    familyName: { type: String, required: [true, "familyName is required!"] },
    givenName: { type: String, required: [true, "givenName is required!"] }
  },
  password: {
    type: String
  },
  phone_number: {
    type: String
  },
  email: {
    type: String,
    required: [true, "User email is required!"],
    lowercase: true,
    validate: {
      isAsync: true,
      validator: function(value, isValid) {
        const self = this;
        return self.constructor
          .findOne({ email: value })
          .exec(function(err, user) {
            if (err) {
              throw err;
            } else if (user) {
              if (self.id === user.id) {
                // if finding and saving then it's valid even for existing email
                return isValid(true);
              }
              return isValid(false);
            } else {
              return isValid(true);
            }
          });
      },
      message: "The email address is already taken!"
    }
  },
  is_active: {
    type: Boolean,
    default: true
  },
  premium: {
    type: Boolean,
    default: false
  },
  organization: {
    type: String,
    default: ""
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  meetings: [
    {
      type: ObjectId,
      ref: "Convo"
    }
  ],
  created_meetings: [
    {
      type: ObjectId,
      ref: "Convo"
    }
  ],
  notificationPref: {
    type: String,
    default: "Email"
  }
});

const userModel = mongoose.model("User", userSchema); // users collection

module.exports = userModel;
