const { findTraceLearning, createTraceLearning, appendTraceLearning } = require("../../dbFunctions/learningresource");
const { findExistingResource, createWebsite, understandWebsiteContent } = require("../../dbFunctions/websiteInfo");
const {Success, ServerError} = require('../../responses')
module.exports = async (req, res) => {

    try {
        url = req.body.url;
        let website = await findExistingResource(url);
        if (!website){

            domain_name = url.split("/").slice(0,3).join("/");
            parameterless_url = url.split("?")[0];
                        

            website = await createWebsite(url, domain_name, parameterless_url);
        }

        let tracelearning = await findTraceLearning(req.body.userId, website); //pass url too

        if (!tracelearning) { 
            tracelearning = await createTraceLearning(req.body.userId, website) 
        }

    
        let singleresource = {
            totalTime:req.body.totalTime,
            startTimeStamp:req.body.startTimeStamp,
            endTimeStamp:req.body.endTimeStamp,
        }


        let finallearning = await appendTraceLearning(tracelearning, singleresource);
        
        res.json({ ...Success });
        }
        catch (err) {
            console.log(err);
            res.json({...ServerError});
        }
}