const mongoose = require('mongoose');
const TestLearning = require('../models/testlearning');

module.exports = {
    addTestLearning: async (userid, testResources) => {
        let testlearning = new TestLearning({
            student_id: userid,
            learning_behaviour:testResources
        });
        return testlearning.save();
    }
}