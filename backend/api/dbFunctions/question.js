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
    },
    findRandomQuestionByTopic: async (subtopic) => {
        const all_questions = await Question.find({ subtopic });
        return all_questions[Math.floor(Math.random() * all_questions.length)];

    }
}