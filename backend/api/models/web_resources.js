const mongoose = require('mongoose');
const { subtopic_list, extra_subtopics } = require("../utils/subtopic_list");


const WebResource = new mongoose.Schema({
    webresouceid:{
        type:String,
    },
    url:{ 
            type: String,
            unique: true 
        },
    paramterless_url: { type: String },
    domain_name: { type: String },
    metadata: {
        description: String,
        title: String,
        keywords: String
    },
    domain: { 
        type: String, enum: ["Educational", "Entertainment", "Other"]
    },
    subtopic: {
        type: String, enum: [
            ...subtopic_list,
            ...extra_subtopics

        ]
    }
})

module.exports = mongoose.model('WebResource', WebResource);


function getRandomInt(arr) {  

    random_list = [];
    vals = []
    max = arr.length();
    for(i=0; i<3; i++){
        let rand = Math.floor(Math.random() * Math.floor(max))
        while(rand in vals){
            rand = Math.floor(Math.random() * Math.floor(max))
        }
        random_list.push(arr[rand]);
        vals.push[rand];
    }
    return random_list;
}

