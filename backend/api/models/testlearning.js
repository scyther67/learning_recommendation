const mongoose = require('mongoose');

const TestLearning = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    learning_behaviour: [{
        url: { type: String },
        totalTime: { type: Number },
        startTimeStamp: { type: Date },
        endTimeStamp: { type: Date },
        intervals: [{
            start: Date,
            end: Date
        }]
    }],
    // learning_behaviour
});

module.exports = mongoose.model('TestLearning', TestLearning);