const mongoose = require('mongoose');
const TestLearning = require('../models/testlearning');

module.exports = {
    createTestLearning: async (id) => {
        let testlearning = new TestLearning({
            student_id: id,
            learning_behavior:[]
        });
        return testlearning.save();
    },
    findTestLearning: async (id) => {
        return TestLearning.findOne({ student_id: id });  
    },
    appendTestLearning: async (testlearning, singleresource) => {
        testlearning.learning_behaviour.push(singleresource);
        // console.log(oldlearningbehavior);
        // let newlearningbehavior = oldlearningbehavior.push(singleresource);
        return TestLearning.findOneAndUpdate({_id:testlearning._id}, { learning_behaviour: testlearning.learning_behaviour });
    }
}