const mongoose = require("mongoose");
const Question = require("../models/question");

module.exports = {
  addQuestion: async (question_header,question_query,question_footer,alternatives,subtopic,correct,questionid,questionImageUrl) => {
    const newquestion = new Question({
      question_header,
      question_query,
      question_footer,
      questionid,
      alternatives,
      correct,
      subtopic,
      questionImageUrl
    });
    return newquestion.save();
  },
  findQuestionById: async(_id)=>{
    return Question.findById(_id);
  },
  findByQuestionId: async (questionid) => {//NOT SAME AS FIND QUESTION BY ID
    return Question.findOne({ questionid });
  },
  findRandomQuestionByTopic: async (subtopic) => {
    const all_questions = await Question.find({ subtopic });
    return all_questions[Math.floor(Math.random() * all_questions.length)];
  },

  UpdateQuestionAnswerTime: async (question, time_taken) => {
    attempts = question.number_of_attempts;
    question.avg_time = (time_taken + question.avg_time * attempts) / (attempts + 1);
    question.number_of_attempts += 1;
    return question.save();
  },
};
