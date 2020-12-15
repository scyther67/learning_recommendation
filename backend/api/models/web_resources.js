const mongoose = require('mongoose');

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
                            "SELECT", 
                            "UPDATE", 
                            "GROUP BY", 
                            "CREATE", 
                            "INSERT",
                            "DELETE", 
                            "JOINS",
                            "PREDICATE", 
                            "SET OPERATORS", 
                            "AGGREGATION",
                            "N/A",
                            "FROM",
                            "WHERE",
                            "JOIN"
                        ]
    }
})

module.exports = mongoose.model('WebResource', WebResource);