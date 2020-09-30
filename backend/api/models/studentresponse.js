const mongoose = require('mongoose');

const StudentResponse = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    response: [{
        questionid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        },
        answer: {
            type: Number, 
            enum: [1, 2, 3]
        },
        start_time: {
            type: Date
        },
        end_time: {
            type: Date
        }
    }]
});

module.exports = mongoose.model('studentresponse', StudentResponse);