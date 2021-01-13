const User = require("../models/user");

module.exports = {
  addUser: async (name, email, passwordhash, age, field_of_study, recent_education, proficiency) => {
    let user = new User({
      name,
      email,
      password: passwordhash,
      isAdmin: false,
      domain_time_dict: { test: 0 },
      age,
      field_of_study,
      recent_education,
      proficiency
    });
    return user.save();
  },
  addAdmin: async (name, email, passwordhash) => {
    let user = new User({
      name,
      email,
      password: passwordhash,
      isAdmin: true,
      domain_time_dict: { test: 0 },
    });
    return user.save();
  },
  findUserByEmail: async (email) => {
    return User.findOne({ email });
  },
  findUserById: async (id) => {
    return User.findById(id);
  },
  convertToAdmin: async (email) => {
    return User.findOneAndUpdate({ email }, { isAdmin: true }, { new: true });
  },
  getSubtopicTimeStamp: async (subtopic_no, userId) => {

    user = await User.findById(userId);
    // console.log(subtopic_no);
    // console.log("USER", user);
    return user.subtopicTimeStamps[subtopic_no];
  },
  updateSubtopicTimeStamp: async (subtopic_no, userId) => {
    const user = await User.findById(userId);
    user.subtopicTimeStamps[subtopic_no] = Date.now();
    user.markModified("subtopicTimeStamps");
    return user.save();
  },
  updateSuggestionToUserCollection: async (userId, general, domainSpecific) =>{
    const user = await User.findById(userId);
    if(user.recommend == null){
      user.recommend = [];
    }
    user.recommendation.push({
      timeStamp: Date.now(),
      general,
      domainSpecific
    });
    console.log("User:", user);
    user.markModified("recommend");
    return user.save();
  }
};
