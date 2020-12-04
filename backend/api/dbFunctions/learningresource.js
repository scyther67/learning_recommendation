const mongoose = require('mongoose');
const TraceLearning = require('../models/tracelearning');


module.exports = {
    createTraceLearning: async (id, website) => {
        let tracelearning = new TraceLearning({
            student_id: id,
            website: website,
            intervals: []
        });
        return tracelearning.save();
    },

    findTraceLearning: async (id, website) => {
        return TraceLearning.findOne({ student_id: id, website: website });  
    },

    appendTraceLearning: async (tracelearning, singleresource) => {
        tracelearning.intervals.push(singleresource);
 

        return TraceLearning.findByIdAndUpdate( tracelearning._id, 
                                                { intervals: tracelearning.intervals }, 
                                                {new:true});
    },
}
