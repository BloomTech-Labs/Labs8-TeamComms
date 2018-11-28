const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

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
  attendees: [
    {
      type: ObjectId,
      ref: "User"
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
  archive: [
    {
      notes: String,
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
      start_time: Date,
      end_time: Date
    }
  ]
});

const convoModel = mongoose.model("Convo", convoSchema);

module.exports = convoModel;
