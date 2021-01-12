const mongoose = require("mongoose");
const { subtopic_list } = require("../utils/subtopic_list");
const Question = new mongoose.Schema({
  question_header: { type: String },
  question_query: { type: String },
  question_footer: { type: String },

  questionid: {
    type: String,
    required: true,
  },
  alternatives: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  correct: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
  },
  subtopic: {
    type: String,
    enum: [
      ...subtopic_list
    ],
  },
  correct: {
    type: Number,
    enum: [0, 1, 2, 3],
    required: true,
  },
  questionImageUrl: {
    type: String,
    required: false,
  },
  avg_time: {
    type: Number,
    default: 30000,
  },
  number_of_attempts: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Question", Question);
