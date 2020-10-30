const mongoose = require('mongoose');
const Question = require('../models/question');

module.exports = {
    addQuestion: async (description, alternatives, subtopic, correct, questionid) => {
        const newquestion = new Question({
            description,
            questionid,
            alternatives,
            correct,
            subtopic
        });
        return newquestion.save();
    },
    findByQuestionId: async (questionid) => {
        return Question.findOne({ questionid });
    }
}