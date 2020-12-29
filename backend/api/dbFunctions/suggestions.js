const mongoose = require("mongoose");
// const TraceLearning = require('../models/tracelearning');
// const User = require('../models/user')
const WebResource = require("../models/web_resources");
const TraceLearning = require("../models/tracelearning");

module.exports = {
  findUnusedResources: async (websites, subtopic) => {
    return WebResource.find(
      {
        _id: { $nin: websites },
        subtopic,
      },
      {
        _id: 0,
        domain_name: 0,
        parameterless_url: 0,
        subtopic: 0,
        domain: 0,
        __v: 0,
      }
    );
  },
  generatePossibleResources: async (subtopic) => {
    return WebResource.find(
      {
        subtopic,
      },
      {
        _id: 0,
        parameterless_url: 0,
        subtopic: 0,
        domain: 0,
        __v: 0,
      }
    );
  },
  getDomainTimeDict: async (user_id) => {
    return user_id.find({
        _id: user_id
    },{
        _id:0,
        email:0,
        name:0,
        password:0,
        isAdmin:0,
        __v:0
    })
  },
  convertIdToDomainArray: async (id_list) => {
    return WebResource.find(
      {
        _id: { $in: id_list },
      },
      {
        _id: 0,
        parameterless_url: 0,
        subtopic: 0,
        domain: 0,
        url: 0,
        __v: 0,
      }
    );
  },
  getTotalTimeArray: async (domain, user_id) => {
    return TraceLearning.find(
      {
        domain_name: domain,
        student_id: user_id,
      },
      {
        _id: 0,
        student_id: 0,
        website: 0,
        intervals: 0,
        __v: 0,
      }
    );
  },
  generateSuggestionsFromCommonDomains: async (selected_domains, subtopic) => {
    return WebResource.find(
      {
        domain_name: { $in: selected_domains },
        subtopic,
      },
      {
        _id: 0,
        webresouceid: 0,
        parameterless_url: 0,
        metadata: 0,
        domain: 0,
        subtopic: 0,
        domain_name: 0,
        __v: 0,
      }
    );
  },
};
