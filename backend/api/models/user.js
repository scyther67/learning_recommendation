const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, default:false},
    domain_time_dict: { type: Object },
    subtopicTimeStamps: {
        type:Array,
        default:[
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now(), 
            Date.now()
        ]
    }
});

module.exports = mongoose.model('user', User);