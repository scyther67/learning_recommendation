const { findTraceLearning, createTraceLearning, appendTraceLearning } = require("../../dbFunctions/learningresource");
const { findExistingResource, createWebsite, understandWebsiteContent } = require("../../dbFunctions/websiteInfo");
const {Success} = require('../../responses')
module.exports = async (req, res) => {

    // console.log("URL : " + req.body.url + "\tTotal Time : " + req.body.totalTime);
    // console.log(req.body.intervals);
    // console.log(req.body.userId);
    // res.json({ status: "OK" });
    // let learning = await 

    try {
        url = req.body.url;
        let website = await findExistingResource(url);

        if (!website){
            content = await understandWebsiteContent(url);
            domain_name = url.split("/")[0];
            base_url = url.split("?")[0];

            website = await createWebsite(url, content, domain_name, base_url);
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
        // console.log(finallearning);
        
        res.json({ ...Success });
        }
        catch (err) {
            console.log(err);
        }
}