const mongoose = require('mongoose');

const WebResource = new mongoose.Schema({
    url:{ 
            type: String,
            unique: true 
        },
    base_url: { type: String },
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
                            "N/A"
                        ]
    }
})

module.exports = mongoose.model('WebResource', WebResource);