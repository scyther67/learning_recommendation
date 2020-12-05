const mongoose = require('mongoose');
const WebResource = require('../models/web_resources');
const urlMetadata = require('url-metadata');

module.exports = {
    createWebsite: async (url/*, content*/, domain_name, parameterless_url) => {

        magic_value = "Educational" //Need to create ML algo to classify on the basis of webiste metadata
        // metadata = {
        //     "decription": content.description,
        //     "title": content.title,
        //     "keywords": content.keywords
        // }
        let website = new WebResource({
            url: url,
            domain_name,
            parameterless_url,
            // metadata,
            domain: magic_value,
            subtopic: "N/A"
        });
        return website.save();
    },

    findExistingResource: async (url) => {
        return WebResource.findOne({ url });  
    },

    understandWebsiteContent: async (resource_url) => {

        return urlMetadata(resource_url);//.then( (metadata)=>{ 
        //     return metadata;
        //     // return {
        //     //     "description": metadata.description,
        //     //     "title": metadata.title,
        //     //     "keywords": metadata.keywords,
        //     // }
        // }).catch((err)=>{
        //      console.log(err);
        //  })

    }
}