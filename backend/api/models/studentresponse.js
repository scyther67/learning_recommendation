const mongoose = require('mongoose');

const StudentResponse = new mongoose.Schema({
    // studentid reference
    // response [{questionid}:[{hisresponse},{starttime},{endtime}]]
    // learning_behaviour
});

module.exports = mongoose.model('studentresponse', StudentResponse);