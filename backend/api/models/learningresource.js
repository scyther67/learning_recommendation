const mongoose = require('mongoose');

const LearningResource = new mongoose.Schema({
    url: { type: String },
    subtopic: { type: String },
    difficulty: { type: Number, enum: [1, 2, 3]
    }
})

module.exports = mongoose.model('LearningResource', LearningResource);