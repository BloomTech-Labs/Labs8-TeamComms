const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const User = require("../models/UserModel"); //Model

const convoSchema = new mongoose.Schema({
  creatorId: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  repeat: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  start_time: {
    type: Date,
    required: true
  },
  end_time: {
    type: Date,
    required: true
  },
  invitees: [
    {
      id: {
        type: ObjectId,
        ref: "User"
    }
  }
  ],
  questions: [
    {
      inquirer: {
        email: {
          type: String,
          required: true
        },
        displayName: {
          type: String,
          required: true
        }
      },
      question: {
        type: String,
        required: true
      },
      answered: {
        type: Boolean,
        default: false
      },
      created_at: {
        type: Date,
        default: Date.now
      },
      answered_at: {
        type: Date
      }
    }
  ],
  notes: String,
  youTube: String,
  zoom: String,
  liveMeeting: {
    type: ObjectId,
    ref: 'LiveMeeting'
  }
  
});

convoSchema.pre("remove", function(next) {
  this.model(User).remove({ meetings: this._id }, next);
  next();
});

const convoModel = mongoose.model("Convo", convoSchema);

module.exports = convoModel;
