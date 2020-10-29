const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: { type: String },
    name: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean, default:false}
});

module.exports = mongoose.model('user', User);