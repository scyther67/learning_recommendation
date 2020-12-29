const {
  findUnusedResources,
  generatePossibleResources,
  convertIdToDomainArray,
  getTotalTimeArray,
  generateSuggestionsFromCommonDomains,
} = require("../../dbFunctions/suggestions");

const { arrSum, softmax } = require("../../utils/domain_specific suggestions");
const { getPrdecessorList } = require("../../utils/predecessor_suggestion");
const { findTraceLearningById } = require("../../dbFunctions/learningresource");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    console.log("MADE AS");
    user_id = req.body.userId;
    const { subtopic, timestamp, question_start_timestamp } = req.body;
    // question_start_timestamp = new Date(timestamp);

    try {
      user_id = req.body.userId;
      const { subtopic, timestamp, question_start_timestamp } = req.body;
      // question_start_timestamp = new Date(timestamp);

      let learnings = await findTraceLearningById(user_id);

      // Find liked Domains

      //Finding websites that can be suggested
      let possible_websites = await generatePossibleResources(subtopic);
      possible_domains = possible_websites.map((a) => a.domain_name);

      //Find Websites that he has already visited


    //   visited_websites = learnings.map((a) => a.website);
    //   visited_domains = await convertIdToDomainArray(visited_websites);
    //   visited_domains = visited_domains.map((a) => {
    //     a.domain_name;
    //   });

      visited_domain_dict = await getDomainTimeDict(user_id);
      visited_domain_dict = visited_domains.map((a) => {
          a.domain_time_dict;
      });

      time_distribution = Object.values(visited_domain_dict);
      time_distribution_softmax = softmax(time_distribution);

      visited_domains = Object.keys(visited_domain_dict);
      most_visited_domains = [];

      for(i = 0; i < time_distribution_softmax.length; i++){
          // SETTING A HARD CODED VALUE HERE (0.3)
          if(time_distribution_softmax[i] > 0.3){
            most_visited_domains.push(visited_domains[i]);
          }
      }

      final_suggestion_domains = most_visited_domains.filter(value => possible_domains.includes(value));


    //   common_domains = [...new Set([...visited_domains, ...possible_domains])];
    //   console.log("COMMON DOMS", common_domains);

    //   final_suggestions = [];

    //   if (common_domains.length > 0) {
    //     total_time_array = [];

    //     time_array = common_domains.map(async (element) => {
    //       resources = await getTotalTimeArray(element, user_id);
    //       resources = resources.map((a) => a.totalTime);
    //       total_time_spent = arrSum(resources);
    //       return element, total_time_spent;
    //     });

    //     softmax_array = softmax(time_array);

    //     for (i = 0; i < softmax_array.length; i++) {
    //       // SETTING A HARD CODED VALUE HERE (0.4)
    //       if (softmax_array[i] >= 0.4) {
    //         final_suggestions.push(common_domains[i]);
    //       }
    //     }
    //   }

      if (final_suggestion_domains > 0) {
        let suggestions = generateSuggestionsFromCommonDomains(
          final_suggestion_domains,
          subtopic
        );
        return res.json({
          showMessage: false,
          goBack: false,
          selectedDomains: true,
          suggestions: suggestions,
        });
      } else {
        let learning_after_question_start = learnings.filter(
          (learning) =>
            learning.intervals[learning.intervals.length - 1].startTimeStamp >
            question_start_timestamp
        );

        if (learning_after_question_start.length == 0) {
          return res.json({ showMessage: true });
        }

        let websites = learning_after_question_start.map((a) =>
          mongoose.Types.ObjectId(a.website._id)
        );

        let suggestions = await findUnusedResources(websites, subtopic);
        suggestions = suggestions.map((ele) => {
          return ele.url;
        });

        if (suggestions.length < 3) {
          predecessor_list = getPrdecessorList(subtopic);
          return res.json({
            showMessage: false,
            goBack: true,
            predecessor_list: predecessor_list,
          });
        }

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

        return res.json({
          showMessage: false,
          goBack: false,
          selectedDomains: false,
          suggestions: random_list,
        });
      }
    } catch (err) {
      console.log(err);
    }

    return res.json({ showMessage: false, suggestions: random_list });
  } catch (err) {
    console.log(err);
  }
};
