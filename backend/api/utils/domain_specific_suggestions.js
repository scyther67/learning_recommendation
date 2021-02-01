const { generatePossibleResources, getDomainTimeDict } = require("../dbFunctions/suggestions");
const { distribution } = require("./suggestions");
const { subtopic_list } = require("../utils/subtopic_list");

module.exports = {
    domainSpecificSuggestions: async (subtopic, user_id)=>{
      
        //Finding websites that can be suggested
      let possible_websites = await generatePossibleResources(subtopic_list[subtopic]);
      possible_domains = possible_websites.map((a) => a.domain_name);

      //Find Websites that he has already visited


    //   visited_websites = learnings.map((a) => a.website);
    //   visited_domains = await convertIdToDomainArray(visited_websites);
    //   visited_domains = visited_domains.map((a) => {
    //     a.domain_name;
    //   });

      visited_domain_dict = await getDomainTimeDict(user_id);

      // visited_domain_dict = visited_domain_dict[0].map((a) => {
      //     a.domain_time_dict;
      // });
      
      visited_domain_dict = visited_domain_dict[0]['domain_time_dict'];
      
      time_distribution = Object.values(visited_domain_dict);
      visited_domains = Object.keys(visited_domain_dict);

      let visited_domain_tup = []
      for(i=0; i < time_distribution.length; i++){
        visited_domain_tup.push([visited_domains[i], time_distribution[i]]);
      }


      considered_visited_domain_tup = visited_domain_tup.filter(value => possible_domains.includes(value[0]));
      
      time_distribution_dist = distribution(considered_visited_domain_tup);

      most_visited_domains = [];


      for(i = 0; i < time_distribution_dist.length; i++){
          // SETTING A HARD CODED VALUE HERE (0.35)
          if(time_distribution_dist[i] > 0.35){
            most_visited_domains.push((time_distribution_dist[i], considered_visited_domain_tup[i][0]));
          }
      }

      most_visited_domains = most_visited_domains.sort(x => x[0]);


      
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
      return most_visited_domains;
    }
}
