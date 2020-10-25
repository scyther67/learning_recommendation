const mongoose = require('mongoose');

const Question = new mongoose.Schema({
    description: { type: String },
    alternatives: [{
            type: String,
            required: true
        },
    ],
    subtopic: {
        type: String,
        enum: ["from", "where", "select", "andornot", "likeinbetween", "join", "subquery",
            "aggregation", "grouping", "having", "create", "alter", "drop", "insert", "update",
            "delete"],
    },
    correct: {
        type: Number,
        enum: [0, 1, 2, 3],
        required: true
    },
    questionImageUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Question', Question);