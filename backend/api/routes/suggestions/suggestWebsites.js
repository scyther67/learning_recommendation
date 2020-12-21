const { findUnusedResources } = require('../../dbFunctions/suggestions');
const { findTraceLearningById } = require("../../dbFunctions/learningresource")
const mongoose = require('mongoose');

module.exports = async (req, res) => {

    try{
        user_id = req.body.userId;
        const { subtopic, timestamp, question_start_timestamp } = req.body; 
        // question_start_timestamp = new Date(timestamp);

        let learnings = await findTraceLearningById(user_id);
        
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

        return res.json({ showMessage:false, suggestions:random_list });
    }
    
    catch (err) {
        console.log(err);
    }

}