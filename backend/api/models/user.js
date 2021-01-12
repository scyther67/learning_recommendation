const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String },
  name: { type: String },
  password: { type: String },
  isAdmin: { type: Boolean, default: false },
  domain_time_dict: { type: Object },
  subtopicTimeStamps: {
    type: Array,
    default: [
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
      Date.now(),
    ],
  },
  recommendation: [
    {
    timeStamp: Date,
    general:[String],
    domainSpecific:[String]
  }],
  age: { type:Number  },
  field_of_study: {type:String},
  recent_education: {
    type:String,
    enum: ["High School", "Undergraduate", "Post Graduate", "Doctorate"]
  },
  proficiency: {
    type:Number,
    enum: [0, 1, 2, 3, 4, 5]
  }
});

module.exports = mongoose.model("user", User);
