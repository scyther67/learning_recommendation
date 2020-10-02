const { addTestLearning } = require("../../dbFunctions/test");

module.exports = async (req, res) => {
    try {
        const testlearning = await addTestLearning(req.body.userId, req.body.testResources);
        if (testlearning) console.log(testlearning);
    }
    catch (err) {
        console.log(err);
    }
}