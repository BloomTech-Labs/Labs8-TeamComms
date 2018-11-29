const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const liveMeetingSchema = new mongoose.Schema({
  notes: { type: String, default: "" },
  questions: [
    {
      socket_id: String,
      question: {
        type: String
      },
      displayName: {
        type: String
      },
      answered: {
        type: Boolean,
        default: false
      },
      created_at: {
        type: Date,
        default: Date.now
      },
    }
  ],
  attendees: [
    {
      displayName: String,
      id: String
    }
  ],
  attended: [
    {
      displayName: String,
      id: String
    }
  ],
  meeting: {
    type: ObjectId,
    ref: "Convo"
  }
});

const liveMeetingModel = mongoose.model("LiveMeeting", liveMeetingSchema);

module.exports = liveMeetingModel;
