const { UpdateQuestionAnswerTime } = require("../../dbFunctions/question");
const { ServerError } = require("../../responses");
const Question = require("../../models/question");

module.exports = async (req, res) => {
  try {
    // Requires the question_response as sent everywhere else
    const { question_response } = req.body;
    console.log("REQ MADE");
    var question = Question.findById(question_response.question_id);
    time_taken = Math.abs(
      question_response.end_time - question_response.start_time
    );
    // console.log(question);
    // violation_level is the level of fluking:
    // If he spent less than 5 seconds on the question, level is 3
    // If he spent less than half the average time it takes to answer the question, level is 2
    // If he takes more than that, level is 1

    if (time_taken < 5000) {
      res.json({ fluke_message: true, violation_level: 3 });
    } else if (time_taken < question.avg_time / 2) {
      res.json({ fluke_message: true, violation_level: 2 });
    } else {
      updation = UpdateQuestionAnswerTime(question, time_taken);
      res.json({ fluke_message: false, violation_level: 1 });
    }
  } catch (err) {
    console.log(err);
    res.json({ ...ServerError });
  }
};
