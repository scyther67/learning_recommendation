const mongoose = require('mongoose');
const TraceLearning = require('../models/tracelearning');
const User = require('../models/user')
const WebResource = require('../models/web_resources');

module.exports = {
    findUnusedResources: async (id, subtopic) => {

        learnings = await TraceLearning.find({
            student_id: id,
            
        })
        
        let websites = learnings.map(a => mongoose.Types.ObjectId(a.website._id) );

        return WebResource.find({
            _id: { $nin: websites },
            subtopic: subtopic
        })

    },
}