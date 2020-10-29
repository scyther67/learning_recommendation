const { addQuestion } = require("../../dbFunctions/question");
const { ServerError, Success } = require("../../responses");
module.exports = async (req, res) => {
    try {
        const newquestion = await addQuestion(req.body.description, req.body.alternatives, req.body.subtopic, req.body.correct);
        console.log(newquestion);
        res.json({ ...Success });
    }
    catch (err) {
        console.log(err);
        res.json({ ...ServerError });
    }
}