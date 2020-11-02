const { findRandomQuestionByTopic } = require("../../dbFunctions/question");
const { Success, ServerError } = require("../../responses");
module.exports = async (req, res) => {
    try {
        const random_question = await findRandomQuestionByTopic(req.body.topic);
        res.json({ ...Success, random_question });
    } catch (err) {
        console.log(err);
        res.json({ ...ServerError });
    }
}