const { addQuestion, findByQuestionId } = require("../../dbFunctions/question");
const { ServerError, Success } = require("../../responses");
const xlsxFile = require('read-excel-file/node');

module.exports = async (req, res) => {
    try {
        var question_data = {};
        xlsxFile('./api/utils/question_images_temp/' + req.body.excelfile).then((rows) => {
            rows.forEach(async (cols) => {
                const questionid = cols[7];
                const existing_question = await findByQuestionId(questionid);
                if (existing_question == null) {
                    const question_header = cols[0];
                    const question_query = cols[1];
                    const question_footer = cols[2];
                    const alternatives = [];
                    for (var i = 3; i < 7; i++) {
                        alternatives.push(
                            {
                                'text': cols[i + 1],
                            }
                        )
                    }
                    const isCorrect = cols[8];
                    const subtopic = cols[9];
                    await addQuestion(
                        question_header,
                        question_query,
                        question_footer,
                        alternatives,
                        subtopic,
                        isCorrect,
                        questionid
                    );
                }
            });
        })
        return res.json({ ...Success });
    }
    catch (err) {
        console.log(err);
        return res.json({ ...ServerError });
    }
}