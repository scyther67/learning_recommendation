const { generateSuggestionsFromCommonDomains } = require("../../dbFunctions/suggestions");
const { satisfactoryBrowsingCheck, getGeneralSuggestions, randomizeSuggestions, getAverageAnswerTime } = require("../../utils/suggestions");
const { domainSpecificSuggestions } = require("../../utils/domain_specific_suggestions");
const { getPredecessorList } = require("../../utils/predecessor_suggestion");
const { findTraceLearningById } = require("../../dbFunctions/learningresource");
const { getSubtopicTimeStamp, updateSuggestionToUserCollection } = require("../../dbFunctions/user");
const { ServerError } = require("../../responses");

module.exports = async (req, res) => {
     try {
      const { subtopic, userId, question_start_timestamp, question_end_timestamp, question_id } = req.body;
      
      const [fluke_message, violation_level] = await getAverageAnswerTime(
        question_start_timestamp, 
        question_end_timestamp, 
        question_id);
      // subtopic_start_timestamp = new Date(timestamp);
      let domainSuggestionsBool = false, goBack = false, domainSuggestions, predecessorList;

      const subtopic_start_timestamp = await getSubtopicTimeStamp(subtopic, userId);
      let learnings = await findTraceLearningById(userId);
      // console.log("LEARNINGS:"+learnings);
      // console.log("SSTS:"+subtopic_start_timestamp);
      let learning_after_subtopic_start = await satisfactoryBrowsingCheck(learnings, subtopic_start_timestamp);
      // console.log("LASS:"+learning_after_subtopic_start);
      if (learning_after_subtopic_start.length == 0) {
        return res.json({ showBrowseMessage: true, fluke_message, violation_level });
      }
      
      
      // Find liked Domains
      final_suggestion_domains = await domainSpecificSuggestions(subtopic, userId);
      
      //if liked Domain exists then make flag true
      if (final_suggestion_domains > 0) {
        domainSuggestionsBool = true;
        // console.log("Found DSS");
        domainSuggestions = generateSuggestionsFromCommonDomains(final_suggestion_domains,subtopic);
      } 

      //get general suggestions
      let suggestions = await getGeneralSuggestions(learning_after_subtopic_start, subtopic);
      // console.log(suggestions);
      let random_list = await randomizeSuggestions(suggestions);
      // console.log(random_list);
      //logic for goback to predecessor
      if (suggestions.length == 0) {
        predecessorList = getPredecessorList(subtopic);
        // console.log(predecessor_list);
        goBack = true;
      }
      else{
        
        //append suggestion to user model
        let update = await updateSuggestionToUserCollection(userId, random_list, domainSuggestions);
        if(update==null)return res.json({...ServerError});
      }
      // console.log(predecessorList);
      // console.log("GB:",goBack);
      // console.log("suggestions:", suggestions);
      return res.json({
        fluke_message, 
        violation_level,
        showBrowseMessage: false,
        goBack,
        predecessorList,
        domainSuggestions,
        domainSuggestionsBool,
        suggestions: random_list
      });
      
    } catch (err) {
      console.log(err);
    }
};
