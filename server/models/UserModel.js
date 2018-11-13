const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required!']
  },
  password: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    validate: {
      isAsync: true,
      validator: function(v, cb) {
        setTimeout(function() {
          var phoneRegex = /\d{3}-\d{3}-\d{4}/;
          var msg = v + ' is not a valid phone number!(111-111-1111)';
          // First argument is a boolean, whether validator succeeded
          // 2nd argument is an optional error message override
          cb(phoneRegex.test(v), msg);
        }, 5);
      },
      // Default error message, overridden by 2nd argument to `cb()` above
      message: 'Default error message'
    },
    required: [true, 'User phone number required']
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
