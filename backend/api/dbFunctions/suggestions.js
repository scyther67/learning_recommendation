const mongoose = require('mongoose');
// const TraceLearning = require('../models/tracelearning');
// const User = require('../models/user')
const WebResource = require('../models/web_resources');

module.exports = {
    findUnusedResources: async (websites, subtopic) => {
            
            return WebResource.find(
            { 
                _id: { $nin: websites },
                subtopic
            },
            {
                _id:0,
                domain_name:0,
                parameterless_url:0,
                subtopic:0,
                domain:0,
                __v:0
            }
        )

    },
}