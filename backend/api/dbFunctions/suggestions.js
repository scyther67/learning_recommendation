const mongoose = require('mongoose');
const TraceLearning = require('../models/tracelearning');
const WebResource = require('../models/web_resources');

module.exports = {
    findUnusedResources: async (id, subtopic) => {
        learnings = TraceLearning.find({ 
                                        student_id: id, 
                                        interval: { $slice: -1,  } 
                                    })
        let websites = learnings.map(a => a.website_id);


        unused_resources = WebResource.find({
            _id: {$not: { $in: [websites] } },
            subtopic: subtopic,
            domain: "Educational"
        })

        return unused_resources
    },
}