const mongoose = require('mongoose');

const Question = new mongoose.Schema({
    description: { type: String },
    alternatives : [
        {
            text: { 
                type: String, required: true
            },
            isCorrect: { 
                type: Boolean, required: true, default: false
            }
        }
    ],
    subtopic: { type: String,
        //enum:[]
    },
    questionImageUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Question', Question);