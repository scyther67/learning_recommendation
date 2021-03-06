const {Success, ServerError, ValidationError, AuthError} = require("../../responses");
const { addStudentResponse } = require("../../dbFunctions/student_response");
const { findRandomQuestionByTopic, findByQuestionId} = require("../../dbFunctions/question");
const { subtopic_list } =require("../../utils/subtopic_list");

module.exports = async (req, res) => {
  try {
    const topics = [
      ...subtopic_list
    ];
    let { question_response, subtopic_no } = req.body;

    if (question_response != null) {
      const { user_response, start_time, end_time, question_ref} = question_response;
      if (question_ref != null) {
        const question = await findByQuestionId(question_ref);
        const answer_correct = question.correct == user_response;
        const new_student_response = await addStudentResponse( user_response, start_time, end_time, question_ref, answer_correct, req.body.userId);
        if (new_student_response == null)
          return res.json({
            ...ServerError,
            msg: "Could not add question response",
          });
      }
    }
    // if (subtopic_no == 0 && student_response_id == null){
    //     student_response = await createStudentResponse(req.body.userId, []);
    //     student_response_id = student_response._id;
    // }
    // else {
    //     student_response = await findStudentResponseById(student_response_id);
    //     if (req.body.userId != student_response.student_id) return res.json({ ...AuthError,msg:"Test doesn't belong to this user" });
    //     const { question_response } = req.body;
    //     const new_student_response = await appendQuestionResponse(student_response, question_response);
    //     if (new_student_response == null) return res.json({ ...ServerError, msg: "Could not add question response" });
    // }

    const topic = topics[subtopic_no];
    const random_question = await findRandomQuestionByTopic(topic);
    return res.json({ ...Success, random_question });
  } catch (err) {
    // if (question_no == 0 && student_response_id == null){
    //     student_response = await createStudentResponse(req.body.userId, []);
    //     student_response_id = student_response._id;
    // }
    // else {
    //     student_response = await findStudentResponseById(student_response_id);
    //     if (req.body.userId != student_response.student_id) return res.json({ ...AuthError,msg:"Test doesn't belong to this user" });
    //     const { question_response } = req.body;
    //     const new_student_response = await appendQuestionResponse(student_response, question_response);
    //     if (new_student_response == null) return res.json({ ...ServerError, msg: "Could not add question response" });
    // }

    console.log(err);
    res.json({ ...ServerError });
  }
};
