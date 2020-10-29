const { findTraceLearning, createTraceLearning, appendTraceLearning } = require("../../dbFunctions/learningresource");
const {Success} = require('../../responses')
module.exports = async (req, res) => {
    // console.log("URL : " + req.body.url + "\tTotal Time : " + req.body.totalTime);
    // console.log(req.body.intervals);
    // console.log(req.body.userId);
    // res.json({ status: "OK" });
    // let learning = await 
    try {
        let tracelearning = await findTraceLearning(req.body.userId);

        if (!tracelearning) { tracelearning = await createTraceLearning(req.body.userId) }
        // console.log(tracelearning);

        let singleresource = {
            url:req.body.url,
            totalTime:req.body.totalTime,
            startTimeStamp:req.body.startTimeStamp,
            endTimeStamp:req.body.endTimeStamp,
            intervals:req.body.intervals
        }
        let finallearning = await appendTraceLearning(tracelearning, singleresource);
        console.log(finallearning);
        res.json({ ...Success });
        }
        catch (err) {
            console.log(err);
        }
}