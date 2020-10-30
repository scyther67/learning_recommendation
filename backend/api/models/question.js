const mongoose = require('mongoose');

const Question = new mongoose.Schema({
    description: { type: String },
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
        enum:["SELECT", "FROM", "WHERE", "UPDATE", "GROUP BY", "CREATE", "INSERT", "DELETE", "JOINS", "PREDICATE","SET OPERATORS", "AGGREGATION"]
    },
    questionImageUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Question', Question);