const { Success, ServerError, ValidationError, AuthError } = require("../../responses");
const { createStudentResponse, findStudentResponseById, appendQuestionResponse } = require("../../dbFunctions/student_response");

module.exports = async (req, res) => {
    try {
        const topics = ["SELECT", "UPDATE", "GROUP BY", "CREATE", "INSERT", "DELETE", "JOINS",
            "PREDICATE", "SET OPERATORS", "AGGREGATION"];
        const { question_no, student_response_id } = req.body;
        let student_response;
        if (question_no == 0 && student_response_id == null)
            student_response = await createStudentResponse(req.body.userId, []);
        else {
            student_response = await findStudentResponseById(student_response_id);
            if (req.body.userId != student_response.student_id) return res.json({ ...AuthError,msg:"Test doesn't belong to this user" });
            const { question_response } = req.body;
            const student_response = await appendQuestionResponse(student_response, question_response);
            if (student_response == null) return res.json({ ...ServerError, msg: "Could not add question response" });
        }
        const topic = topics[question_no];
        const random_question = await findRandomQuestionByTopic(topic);
    }
    catch (err) {
        console.log(err);
        res.json({ ...ServerError });
    }
}