const mongoose = require('mongoose');

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
                type: String, required: true
            }
        }
    ],
    correct: { 
        type: Number,
        enum: [0, 1, 2, 3],
        required: true
    },
    subtopic: {
        type: String,
        enum: ["SELECT", "UPDATE", "GROUP BY", "CREATE", "INSERT", "DELETE", "JOINS",
            "PREDICATE", "SET OPERATORS", "AGGREGATION"]
    },
    questionImageUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Question', Question);