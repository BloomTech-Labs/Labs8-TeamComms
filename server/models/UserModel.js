const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, 'displayName is required!']
  },
  name: {
    familyName: {type: String, required: [true, "familyName is required!"]},
    givenName: {type: String, required: [true, "givenName is required!"]},
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
  }, 
  email: {
    type: String,
    required: [true, 'User email is required!'],
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
  }
});

const userModel = mongoose.model("User", userSchema); // users collection

module.exports = userModel;
