const { generatePossibleResources, getDomainTimeDict } = require("../dbFunctions/suggestions");
const { softmax } = require("./suggestions");

module.exports = {
    domainSpecificSuggestions: async (subtopic, user_id)=>{
      
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
      return final_suggestion_domains;
    }
}