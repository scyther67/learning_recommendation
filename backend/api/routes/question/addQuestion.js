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
                    const description = cols[0];
                    const alternatives = [];
                    for (var i = 0; i < 4; i++) {
                        alternatives.push(
                            {
                                'text': cols[i + 1],
                            }
                        )
                    }
                    const isCorrect = cols[5];
                    const subtopic = cols[6];
                    await addQuestion(
                        description,
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