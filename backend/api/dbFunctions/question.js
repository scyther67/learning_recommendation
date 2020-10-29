const mongoose = require('mongoose');
const Question = require('../models/question');

module.exports = {
    addQuestion: async (description, alternatives, subtopic, correct) => {
        const newquestion = new Question({
            description,
            alternatives,
            subtopic,
            correct
        });
        return newquestion.save();
    }
}