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
    },
    getSubtopicTimeStamp: async (subtopic_no, userId) => {
        user = await User.findById(userId);
        return user.subtopicTimeStamps[subtopic_no];
    },
    updateSubtopicTimeStamp: async (subtopic_no, userId) =>{
        const user = await this.findUserById(userId);
        user.subtopicTimeStamps[subtopic_no] = Date.now();
        return user.save();
    }
}