const { addQuestion } = require("../../dbFunctions/question");
const { ServerError, Success } = require("../../responses");
module.exports = async (req, res) => {
    try {
        const newquestion = await addQuestion(res.body.description, res.body.alternatives, res.body.subtopic, res.body.correct);
        res.json(...Success);
    }
    catch (err) {
        console.log(err);
        res.json(...ServerError);
    }
}