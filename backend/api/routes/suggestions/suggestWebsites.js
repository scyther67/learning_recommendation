const { findUnusedResources, 
        generatePossibleResources, 
        convertIdToDomainArray, 
        getTotalTimeArray,
        generateSuggestionsFromCommonDomains
     } = require('../../dbFunctions/suggestions');
const { findTraceLearningById } = require("../../dbFunctions/learningresource")
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    try{
        user_id = req.body.userId;
        const { subtopic, timestamp, question_start_timestamp } = req.body; 
        // question_start_timestamp = new Date(timestamp);

        let learnings = await findTraceLearningById(user_id);

        // Find liked Domains
        let possible_websites = await generatePossibleResources(subtopic);
        possible_domains = possible_websites.map(a => a.domain_name);

        visited_websites = learnings.map(a => a.website)
        visited_domains = convertIdToDomainArray(visited_websites)

        common_domains = [...new Set([...visited_domains, ...possible_domains])]

        if(common_domains.length > 0){
            total_time_array = []

            const arrSum = arr => arr.reduce((a,b) => a + b, 0)

            function softmax(arr) {
                return arr.map(function(value,index) { 
                return Math.exp(value) / arr.map( function(y){ return Math.exp(y) } ).reduce( function(a,b){ return a+b })
                })
            }

            time_array = common_domains
                        .map(element => {
                                resources = await getTotalTimeArray(element, user_id);
                                resources = resources.map(a => a.totalTime);
                                total_time_spent = arrSum(resources);
                                return (element, total_time_spent)
                        });
            
            softmax_array = softmax(time_array);
            final_suggestions = []
            for(i = 0; i < softmax_array.length; i++){
                // SETTING A HARD CODED VALUE HERE (0.4)
                if(softmax_array[i] >= 0.4 ){
                    final_suggestions.push(common_domains[i]);
                } 
            }
        }

        if(final_suggestions > 0){
            let suggestions = generateSuggestionsFromCommonDomains(final_suggestions, subtopic);
            return res.json({ showMessage:false, selectedDomains: true, suggestions:suggestions });
        }
        else{
            let learning_after_question_start = learnings.filter(
                (learning)=>(learning.intervals[learning.intervals.length-1].startTimeStamp)>question_start_timestamp);
                
            if(learning_after_question_start.length == 0){
                return res.json({showMessage:true});
            }
    
            let websites = learning_after_question_start.map(a => mongoose.Types.ObjectId(a.website._id) );
    
            let suggestions = await findUnusedResources(websites, subtopic);
            suggestions = suggestions.map((ele)=>{
                return ele.url;
            });
            random_list = [];
            vals = [];
            max = suggestions.length;
            for(i=0; i<3; i++){
                let rand = Math.floor(Math.random() * Math.floor(max));
                while(rand in vals){
                    rand = Math.floor(Math.random() * Math.floor(max));
                }
                random_list.push(suggestions[rand]);
                vals.push[rand];
            }
    
            return res.json({ showMessage:false, selectedDomains: false, suggestions:random_list });
        }
    }
    
    catch (err) {
        console.log(err);
    }

}