const mongoose = require('mongoose');
const Question = require('../models/question');

module.exports = {
    addQuestion: async (description, alternatives, subtopic) => {
        const newquestion = new Question({
            description,
            alternatives,
            subtopic
        });
        return newquestion.save();
    }
}