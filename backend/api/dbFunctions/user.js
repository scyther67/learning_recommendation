const User = require('../models/user');
module.exports = {
    addUser: async (name, email, passwordhash) => {
        let user = new User({
            name,
            email,
            password: passwordhash,
            isAdmin: false
        })
        return user.save();
    },
    addAdmin: async (name, email, passwordhash) => {
        let user = new User({
            name,
            email,
            password: passwordhash,
            isAdmin: true
        })
        return user.save();
    },
    findUserByEmail: async (email) => {
        return User.findOne({ email });
    },
    findUserById: async (id) => {
        return User.findById(id);
    },
    convertToAdmin: async (email) => {
        return User.findOneAndUpdate({email}, {isAdmin:true}, { new: true });
    }
}