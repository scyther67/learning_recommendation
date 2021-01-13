const { addTestLearning } = require("../../dbFunctions/test");
const { Success, ServerError } = require("../../responses");

module.exports = async (req, res) => {
    try {
        const testlearning = await addTestLearning(req.body.userId, req.body.testResources);
        if (testlearning==null) return res.json({...ServerError});
        
        return res.json({...Success});
    }
    catch (err) {
        console.log(err);
    }
}