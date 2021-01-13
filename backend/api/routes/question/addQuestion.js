const { addQuestion, findByQuestionId } = require("../../dbFunctions/question");
const { ServerError, Success } = require("../../responses");
const xlsxFile = require("read-excel-file/node");

module.exports = async (req, res) => {
  try {
    var question_data = {};
    xlsxFile("./api/utils/question_images_temp/" + req.body.excelfile).then(
      (rows) => {
        rows.forEach(async (cols) => {
          const questionid = cols[9];
          const existing_question = await findByQuestionId(questionid);
          if (existing_question == null) {
            const question_header = cols[0];
            const question_query = cols[1];
            const question_footer = cols[2];
            const questionImageURL = cols[10];
            const alternatives = [];

            for (var i = 3; i < 7; i++) {
              alternatives.push({
                text: cols[i],
              });
            }
            const isCorrect = cols[7];
            const subtopic = cols[8];
            // console.log(cols[11]);
            await addQuestion(
              question_header,
              question_query,
              question_footer,
              alternatives,
              subtopic,
              isCorrect,
              questionid,
              questionImageURL
            );
          }
        });
      }
    );
    return res.json({ ...Success });
  } catch (err) {
    console.log(err);
    return res.json({ ...ServerError });
  }
};
