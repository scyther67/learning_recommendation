const mongoose = require('mongoose');

const LearningBehaviour = new mongoose.Schema({
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    // learning_behaviour
});

module.exports = mongoose.model('learningbehaviour', LearningBehaviour);