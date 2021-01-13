const { findUnusedResources } = require("../dbFunctions/suggestions");
const { findQuestionById, UpdateQuestionAnswerTime} = require("../dbFunctions/question");
const { subtopic_list } = require("../utils/subtopic_list");
const mongoose = require('mongoose');
module.exports = {
  arrSum: (arr) => {
    arr.reduce((a, b) => a + b, 0);
  },

  distribution: (arr) => {
    let sum = arr.reduce((r, a) => a.map((b, i) => (r[i] || 1) + b), [])[1];
    let final_dist = []
    for(i=0; i<arr.length; i++){
      final_dist.push(arr[i][1] / sum);
    }
    return final_dist;
  },
  satisfactoryBrowsingCheck: async (learnings, subtopic_start_timestamp) => {
    let learning_after_question_start = learnings.filter((learning) => {
      
      let a =  learning.intervals.some((interval) => {
        return interval.endTimeStamp - interval.startTimeStamp >= 5000 &&
          interval.startTimeStamp.getTime() > subtopic_start_timestamp;
      });
      return a;
    });
    return learning_after_question_start;
  },
  getGeneralSuggestions: async (learning_after_question_start, subtopic_no) => {
    // console.log("LAQS:",learning_after_question_start);
    let websites = learning_after_question_start.map((a) =>
      mongoose.Types.ObjectId(a.website._id)
    );
    // console.log("websites:",websites);
    let suggestions = await findUnusedResources(websites, subtopic_list[subtopic_no]);
    console.log(suggestions);
    return (suggestions = suggestions.map((ele) => {
      return ele.url;
    }));
  },

  getUnusedDomainSpecificSuggestions: async(suggested_websites, learning_after_question_start) => {
    let used_websites = learning_after_question_start.map((a) => mongoose.Types.ObjectId(a.website._id));
    used_websites = used_websites.map((a) => a.url);

    let final_suggestions = [];
    for(i=0; i<suggested_websites.length; i++){
      if(!used_websites.includes(suggested_websites[i])){
        final_suggestions.push(suggested_websites[i]);
      }
    }
    return final_suggestions;
  },

  randomizeSuggestions: async (suggestions) => {
    let len = suggestions.length;
    let n = len>3? 3:len;
    let result = new Array(n), taken = new Array(len);
    
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = suggestions[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  },
  getAverageAnswerTime: async (
    question_start_timestamp,
    question_end_timestamp,
    question_id
  ) => {
    question_start_timestamp = new Date(question_start_timestamp).getTime();
    question_end_timestamp = new Date(question_end_timestamp).getTime();
    question = await findQuestionById(question_id);

    time_taken = Math.abs(question_end_timestamp - question_start_timestamp);

    let fluke_message = false,
      violation_level = 0;
    // violation_level is the level of fluking:
    // If he spent less than 5 seconds on the question, level is 3
    // If he spent less than half the average time it takes to answer the question, level is 2
    // If he takes more than that, level is 1

    if (time_taken < 5000) {
      fluke_message = true;
      violation_level = 3;
    } else if (time_taken < question.avg_time / 2) {
      updation = await UpdateQuestionAnswerTime(question, time_taken);
      fluke_message = true;
      violation_level = 2;
    } else if (time_taken > question.avg_time * 3) {
      fluke_message = true;
      violation_level = 1;
    } else {
      updation = await UpdateQuestionAnswerTime(question, time_taken);
      fluke_message = false;
      violation_level = 0;
    }
    return [fluke_message, violation_level];
    // if (time_taken < 5000) {
    //   res.json({ fluke_message: true, violation_level: 3 });
    // } else if (time_taken < question.avg_time / 2) {
    //   res.json({ fluke_message: true, violation_level: 2 });
    // } else {
    //   updation = UpdateQuestionAnswerTime(question, time_taken);
    //   res.json({ fluke_message: false, violation_level: 1 });
    // }
  },
};
