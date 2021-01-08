const { findUnusedResources } = require("../dbFunctions/suggestions");
const {
  findQuestionById,
  UpdateQuestionAnswerTime,
} = require("../dbFunctions/question");
module.exports = {
  arrSum: (arr) => {
    arr.reduce((a, b) => a + b, 0);
  },

  softmax: (arr) => {
    return arr.map(function (value, index) {
      return (
        Math.exp(value) /
        arr
          .map(function (y) {
            return Math.exp(y);
          })
          .reduce(function (a, b) {
            return a + b;
          })
      );
    });
  },
  satisfactoryBrowsingCheck: async (learnings, subtopic_start_timestamp) => {
    // let learning_after_question_start = learnings.filter((learning) =>
    //     learning.intervals[learning.intervals.length - 1].startTimeStamp >
    //     subtopic_start_timestamp
    // ); //change this logic to include atleast one greater than 5 seconds
    let learning_after_question_start = learnings.filter((learning) => {
      return learning.intervals.some((interval) => {
        interval.endTimeStamp - interval.startTimeStamp >= 5000 &&
          interval.startTimeStamp > subtopic_start_timestamp;
      });
    });
    return learning_after_question_start;
  },
  getGeneralSuggestions: async (learning_after_question_start) => {
    let websites = learning_after_question_start.map((a) =>
      mongoose.Types.ObjectId(a.website._id)
    );

    let suggestions = await findUnusedResources(websites, subtopic);
    return (suggestions = suggestions.map((ele) => {
      return ele.url;
    }));
  },
  randomizeSuggestions: async (suggestions) => {
    random_list = [];
    vals = [];
    max = suggestions.length;
    for (i = 0; i < 3; i++) {
      let rand = Math.floor(Math.random() * Math.floor(max));
      while (rand in vals) {
        rand = Math.floor(Math.random() * Math.floor(max));
      }
      random_list.push(suggestions[rand]);
      vals.push[rand];
    }
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
