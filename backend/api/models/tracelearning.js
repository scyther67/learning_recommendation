const mongoose = require('mongoose');

const TraceLearning = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    website: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WebResource'
    },
    intervals: [
        {
            totalTime: { type: Number },
            startTimeStamp: { type: Date },
            endTimeStamp: { type: Date },
        }
    ]
});

module.exports = mongoose.model('TraceLearning', TraceLearning);