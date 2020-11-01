const mongoose = require("mongoose");

const Student_Response = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  response: [
    {
      question_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      user_response: {
        type: Number,
        enum: [1, 2, 3, 4],
      },
      start_time: {
        type: Date,
      },
      end_time: {
        type: Date,
      },
    },
  ],
  datetime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Student_Response", Student_Response);
