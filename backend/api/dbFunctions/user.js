const User = require('../models/user');
module.exports = {
    addUser: async (name, email, passwordhash) => {
        let user = new User({
            name,
            email,
            password:passwordhash
        })
        return user.save();
    },
    findUserByEmail: async (email) => {
        return User.findOne({ email });
    },
    findUserById: async (id) => {
        return User.findById(id);
    }
}