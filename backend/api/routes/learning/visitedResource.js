const { findTestLearning, createTestLearning, appendTestLearning } = require("../../dbFunctions/learningresource");
const {Success} = require('../../responses')
module.exports = async (req, res) => {
    // console.log("URL : " + req.body.url + "\tTotal Time : " + req.body.totalTime);
    // console.log(req.body.intervals);
    // console.log(req.body.userId);
    // res.json({ status: "OK" });
    // let learning = await 
    try {
        let testlearning = await findTestLearning(req.body.userId);

        if (!testlearning) { testlearning = await createTestLearning(req.body.userId) }
        // console.log(testlearning);

        let singleresource = {
            url:req.body.url,
            totalTime:req.body.totalTime,
            startTimeStamp:req.body.startTimeStamp,
            endTimeStamp:req.body.endTimeStamp,
            intervals:req.body.intervals
        }
        let finallearning = await appendTestLearning(testlearning, singleresource);
        console.log(finallearning);
        res.json({ ...Success });
        }
        catch (err) {
            console.log(err);
        }
}