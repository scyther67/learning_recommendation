const mongoose = require("mongoose");
const Question = require("../models/question");

module.exports = {
  addQuestion: async (
    question_header,
    question_query,
    question_footer,
    alternatives,
    subtopic,
    correct,
    questionid,
    questionImageUrl
  ) => {
    const newquestion = new Question({
      question_header,
      question_query,
      question_footer,
      alternatives,
      correct,
      subtopic,
      questionid,
      questionImageUrl,
    });
    return newquestion.save();
  },
  findByQuestionId: async (questionid) => {
    return Question.findOne({ questionid });
  },
  findRandomQuestionByTopic: async (subtopic) => {
    const all_questions = await Question.find({ subtopic });
    return all_questions[Math.floor(Math.random() * all_questions.length)];
  },
};
