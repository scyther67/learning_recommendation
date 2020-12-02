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
    domain: { type: String, enum: ["Education", "Entertainment", "Other"]
    }
})

module.exports = mongoose.model('WebResource', WebResource);