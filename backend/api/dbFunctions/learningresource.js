const mongoose = require('mongoose');
const TraceLearning = require('../models/tracelearning');
const User = require('../models/user');


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

    findTraceLearningById: async(id)=>{
        return TraceLearning.find({
            student_id: id
        });
    },

    updateUserDomainDict: async(id, domain_name, total_time) => {
        return User.find({
            _id: id
        }).then((user) => {
            if(Object.keys(user.domain_time_dict).includes(domain_name)){
                user.domain_time_dict[domain_name] += total_time;
            }else{
                user.domain_time_dict[domain_name] += total_time
            }
            user.save();
        })
    }
}
