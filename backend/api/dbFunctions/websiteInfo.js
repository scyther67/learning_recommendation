const mongoose = require('mongoose');
const WebResource = require('../models/web_resources');
const urlMetadata = require('url-metadata');

module.exports = {
    createWebsite: async (url) => {

        content = await this.understandWebsiteContent(url)
        domain_name = url.split("/")[0]
        base_url = url.split("?")[0]


        magic_value = "Educational" //Need to create ML algo to classify on the basis of webiste metadata

        let website = new WebResource({
            url: url,
            domain_name: domain_name,
            base_url: base_url,
            metadata: content,
            domain: magic_value,
            subtopic: "N/A"
        });
        return website.save();
    },

    findExistingResource: async (url) => {
        return WebResource.findOne({ url: url });  
    },

    understandWebsiteContent: async (resource_url) => {

        urlMetadata(resource_url).then(
        function (metadata) { 
            return {
                "description": metadata.description,
                "title": metadata.title,
                "keywords": metadata.keywords,
            }
        },
        function (error) { 
            console.log(error)
  })

    }
}