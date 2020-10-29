const mongoose = require('mongoose');
const TraceLearning = require('../models/tracelearning');

module.exports = {
    createTraceLearning: async (id) => {
        let tracelearning = new TraceLearning({
            student_id: id,
            learning_behavior:[]
        });
        return tracelearning.save();
    },
    findTraceLearning: async (id) => {
        return TraceLearning.findOne({ student_id: id });  
    },
    appendTraceLearning: async (tracelearning, singleresource) => {
        tracelearning.learning_behaviour.push(singleresource);
        // console.log(oldlearningbehavior);
        // let newlearningbehavior = oldlearningbehavior.push(singleresource);
        return TraceLearning.findByIdAndUpdate( tracelearning._id, { learning_behaviour: tracelearning.learning_behaviour }, {new:true});
    }
}
